# This python script is used to extract docx data then insert them as MongoDB documents.

## Requirements

pip install python-docx

pip install pymongo

### Configuration

Make sure to check the following variables are set correctly:

```
Database name : Chatbot-entries
Collection Name : answers
Input Docx Name : <Your File Name>
```

The Structure of the Documents to be inserted are as follows :
```
{
    A_id : null
    topic : "topic1"
    answer : "answer1"
    questions : [
        {question:"question 1"},
        {question:"question 2"},
        ...,
        {question:"question N"}
    ]
}
```

### Run

Make sure the python script and the docx file are in the same folder. Then run the following command:

```
> python DoctoObject.py
```
