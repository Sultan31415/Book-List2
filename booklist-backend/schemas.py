from pydantic import BaseModel

class BookBase(BaseModel):
    title: str
    author: str

class BookCreate(BookBase):
    pass

class Book(BookBase):
    id: int

    class Config:
        from_attributes = True

class BookDiscovery(BaseModel):
    title: str
    author: str
    description: str
    image_url: str
    category: str 