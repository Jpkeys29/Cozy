from flask import Flask, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os
load_dotenv()
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy import create_engine
from sqlalchemy import Enum

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

class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(45), unique=True, nullable=False)
    email= db.Column(db.String(255), unique=True, nullable=False)
    photo= db.Column(db.String(255), nullable=True)
    gender= db.Column(Enum('male','female','other', name='gender_enum'), nullable=False)
    occupation= db.Column(Enum('professional','student','other', name='occupation_enum'), nullable=False)


@app.route('/', methods=['GET'])
def home():
    return "Home"

@app.route('/api/get_posting', methods=['GET'])
def get_posting():
    # posting_list = Roomie1.query.limit(15).all()
    posting_list = Roomie1.query.all()
    if posting_list :
        postings = []
        for posting in posting_list:
            postings.append({'title': posting.title, 'description' : posting.description, 'image' : posting.image, 'price' : posting.price, 'availability' : posting.availability, 'area': posting.area, 'neighborhood' : posting.neighborhood})
        return jsonify({'postings': postings})
    else:
        return jsonify({'message' : 'Not able to fetch posting'})
    

@app.route('/api/get_profile/<int:profile_id>', methods=['GET'])
def get_profile(profile_id):
    profile = Profile.query.get(profile_id)
    print(profile)
    if profile is None:
        return jsonify({"error": "Profile not found"}), 404
    profile_data = {
            "id": profile.id,
            "name": profile.name,
            "email": profile.email,
            "photo": profile.photo,
            "gender": profile.gender,
            "occupation": profile.occupation
        }
    return jsonify(profile_data)

def check_address_db(formatted_address):
    address = Roomie1.query.filter(
        (Roomie1.area == formatted_address) | (Roomie1.neighborhood == formatted_address)
    ).first()
    return address

@app.route('/api/check_address', methods=['POST'])
def check_address():
    data = request.get_json()
    if data is None:
        return jsonify({"message":"Invalid json"})
    print("Received data:", data)
    formatted_address = data.get('formattedAddress')
    print(formatted_address)

    if formatted_address:
        address = check_address_db(formatted_address) 

        if address:
            return jsonify({
                "area": address.area,
                "neighborhood": address.neighborhood,
                "price": address.price,
                "title": address.title,
                "description": address.description,
                "image": address.image
            }), 200
        else:
            return jsonify({"message": "Address not found"}), 404
    else:
        return jsonify({"message": "No address provided"}),404

@app.route("/api/add_posting", methods=["POST"])
def add_posting():
    try:
        posting_data = request.get_json()
        print(posting_data)

        title = posting_data.get('title')
        description = posting_data('description')
        image = posting_data('image')
        price = posting_data('price')
        availability = posting_data('availability')
        area = posting_data('area')
        neighborhood = posting_data('neighborhood')

        new_posting = Roomie1(title=title, description=description, image=image, price=price, availability=availability, area=area, neighborhood=neighborhood)

        db.session.add(new_posting)
        db.session.commit()
        return jsonify({'message': 'Posting added successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route("/api/add_profile", methods=["POST"])
def add_profile():
    try: 
        auth_header = request.headers.get('Authorization')
        access_token = None
        if auth_header and auth_header.startswith("Bearer"):
            access_token = auth_header.split(" ")[1]

            if access_token:
                print("Received accessToken:", access_token)
            else:
                print("No accessToken provided")
                
        upload_folder = 'uploads'

        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)

        print(request.files)
        name = request.form.get('name')
        email = request.form.get('email')
        gender = request.form.get('gender')
        occupation = request.form.get('occupation')
        photo = request.files.get('photo')
        photo_path = None
        if photo:
            photo_path = os.path.join('uploads', photo.filename)
            photo.save(photo_path)

        new_profile = Profile(name=name, email=email, photo=photo_path, gender=gender, occupation=occupation)
        db.session.add(new_profile)
        db.session.commit()
        return jsonify({'message': 'Profile added successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
# @app.route('/api/input_area_neighborhood', methods=['GET'])
# def area_neighborhood():
#     data = request.get_json()
#     area = data.get('area')
#     neighborhood = data.get('neighborhood')
#     query = Roomie1.query
#     if area:
#         query = query.filter_by(area=area)
#     if neighborhood:
#         query = query.filter_by(neighborhood=neighborhood)

#     posting_list = query.limit(10).all

#     if posting_list :
#         postings = []
#         for posting in posting_list:
#             postings.append({'title': posting.title, 'description' : posting.description, 'image' : posting.image, 'price' : posting.price, 'availability' : posting.availability, 'area': posting.area, 'neighborhood' : posting.neighborhood})
#         return jsonify({'message': 'Postings found', 'postings': postings})
#     else:
#         return jsonify({'message' : 'Not able to fetch posting'})


if __name__ == '__main__':
    app.run(debug=True)