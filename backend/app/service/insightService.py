from app.db.repository.insightRepo import InsightRepository
from app.service.crawlService import CrawlService
from sqlalchemy.orm import Session

from app.util.helpers import model_to_dict


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

        return prompt
