from fastapi import FastAPI
from pydantic import BaseModel
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.llms import Ollama

app = FastAPI()

base = TextLoader("data/furia.txt")
documentos = base.load()
embeddings = HuggingFaceEmbeddings()
db = FAISS.from_documents(documentos, embeddings)

llm = Ollama(model="llama3")

class Pergunta(BaseModel):
    pergunta: str
    
@app.post("/pergunta")
def responder(pergunta: Pergunta):
    resposta = db.similarity_search(pergunta.pergunta)
    contexto = resposta[0].page_content if resposta else ""
    
    prompt = f"""
    Use o contexto abaixo para responder:

    {contexto}

    Pergunta: {pergunta.pergunta}
    """
    response = llm.invoke(prompt)

    return {"answer": response}