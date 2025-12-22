from fastapi import FastAPI, Depends, BackgroundTasks
from fastapi.openapi.utils import get_openapi
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.util.init_db import create_tables
from app.routers.auth import authRouter
from app.util.protectRoute import get_current_user
from app.db.schema.user import UserOutput
from crawler.main import run_crawler


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB at start
    print("Created")
    create_tables()
    yield


app = FastAPI(lifespan=lifespan)


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="FastAPI application",
        version="1.0.0",
        description="JWT Authentication and Authorization",
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {"type": "http", "scheme": "bearer", "bearerFormat": "JWT"}
    }
    openapi_schema["security"] = [{"BearerAuth": []}]
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi

app.include_router(router=authRouter, tags=["auth"], prefix="/auth")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/status")
def health_check():
    return {"status": "Running..."}


@app.get("/protected")
def read_protected(user: UserOutput = Depends(get_current_user)):
    return {"data": user}


@app.post("/crawl")
def start_crawler(background_tasks: BackgroundTasks, url: str, limit: int = 10):
    background_tasks.add_task(run_crawler, homepage=url, max_links=limit)

    return {"message": "Crawler started", "url": url, "limit": limit}
