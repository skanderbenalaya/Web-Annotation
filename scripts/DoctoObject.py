#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import docx

# import the MongoClient class
from pymongo import MongoClient
# create a MongoDB client instance
mongo_client = MongoClient('localhost', 27017)
db = mongo_client['Chatbot-entries']
col = db.answers

doc = docx.Document('laposte_d17_buttons.docx')
data = ""
segments = []
for para in doc.paragraphs:
    data = para.text
    segments = (data.split("**"))
lines = []
for segment in segments:
    lines.append(segment.strip("\n"))

mongo_docs = []
doc = {}
questions=[]
for line in lines:
    if line.startswith("#####"):
        doc = {}
        doc["A_id"] = None
        questions=[]
        doc["topic"] = line.split("#####")[1].strip()
    if (line.startswith("QDF") or line.startswith("d17")):
        questions+=[{"question":(line.split(":",1)[1].strip())}]
        doc["questions"]=questions
    if line.startswith("utter_"):
        doc["answer"] = line.split(":",1)[1].strip()
        mongo_docs += [doc]

# print(mongo_docs)
result = col.insert_many( mongo_docs )
# get the total numbers of docs inserted
total_docs = len(result.inserted_ids)
print ("total inserted:", total_docs)
print ("inserted IDs:", result.inserted_ids, "\n\n")
