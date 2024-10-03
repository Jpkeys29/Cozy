from flask import Flask, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os
load_dotenv()
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy import create_engine
app = Flask(__name__)
CORS(app)


db_password = os.environ['DB_PSSWRD']
app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql+mysqlconnector://root:{db_password}@localhost/hommie1"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

class Roomie1(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title=db.Column(db.Text, unique=False, nullable=False)
    description=db.Column(db.Text)
    image=db.Column(db.String(2000))
    price=db.Column(db.Integer)
    availability=db.Column(db.String(50))
    area=db.Column(db.String(50))
    neighborhood=db.Column(db.String(50))

    # def to_json(self):
    #     return {
    #         "id": self.id,
    #         "title": self.title,
    #         "description": self.description,
    #         "image": self.image,
    #         "price": self.price,
    #         "availability": self.availability,
    #         "area": self.area,
    #         "neighborhood": self.neighborhood
    #     }


@app.route('/', methods=['GET'])
def home():
    return "Home"

@app.route('/api/get_posting', methods=['GET'])
def get_posting():
    posting_list = Roomie1.query.limit(15).all()
    if posting_list :
        postings = []
        for posting in posting_list:
            postings.append({'title': posting.title, 'description' : posting.description, 'image' : posting.image, 'price' : posting.price, 'availability' : posting.availability, 'area': posting.area, 'neighborhood' : posting.neighborhood})
        return jsonify({'postings': postings})
    else:
        return jsonify({'message' : 'Not able to fetch posting'})
    
@app.route('/api/input_area_neighborhood', methods=['GET'])
def area_neighborhood():
    data = request.get_json()
    area = data.get('area')
    neighborhood = data.get('neighborhood')
    query = Roomie1.query
    if area:
        query = query.filter_by(area=area)
    if neighborhood:
        query = query.filter_by(neighborhood=neighborhood)

    posting_list = query.limit(10).all

    if posting_list :
        postings = []
        for posting in posting_list:
            postings.append({'title': posting.title, 'description' : posting.description, 'image' : posting.image, 'price' : posting.price, 'availability' : posting.availability, 'area': posting.area, 'neighborhood' : posting.neighborhood})
        return jsonify({'message': 'Postings found', 'postings': postings})
    else:
        return jsonify({'message' : 'Not able to fetch posting'})


    

if __name__ == '__main__':
    app.run(debug=True)