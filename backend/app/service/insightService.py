from app.db.repository.insightRepo import InsightRepository
from app.service.crawlService import CrawlService
from sqlalchemy.orm import Session
from openai import OpenAI
from app.util.helpers import model_to_dict
from decouple import config
from typing import cast
import json

OPENAI_API_KEY = cast(str, config("OPENAI_API_KEY"))


class InsightService:
    def __init__(self, session: Session):
        self.__insightRepository = InsightRepository(session=session)
        self.__crawlService = CrawlService(session=session)

    def create_insight(self, input, job_id, user):
        # get page data array
        pages_data = self.__crawlService.get_list(
            job_id=int(job_id),
            user_id=user.id,
            page=int(1),
            per_page=int(100),
        )["data"]

        pages_data_arr = [model_to_dict(page) for page in pages_data]

        prompt = f"""
        You are a web intelligence assistant.

        Rules:
        - Use ONLY the provided website data
        - Do NOT hallucinate
        - If not found, set "found": false

        Website Data:
        {pages_data_arr}

        User Question:
        {input}

        Respond ONLY in this JSON format:
        {{
        "found": true | false,
        "answer": "string",
        "source_hint": "short description of where the answer was found"
        }}
        """

        client = OpenAI(api_key=OPENAI_API_KEY)

        response = client.responses.create(
            model="gpt-5-nano",
            input=prompt,
            store=True,
        )

        raw_text = response.output_text
        parsed = json.loads(raw_text)

        # save response to db
        created_insight = self.__insightRepository.create_insight(
            user_id=user.id,
            job_id=int(job_id),
            found=parsed["found"],
            answer=parsed["answer"],
            source_hint=parsed["source_hint"],
        )

        return created_insight.id
