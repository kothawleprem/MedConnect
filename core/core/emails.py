from trycourier import Courier
import os

client = Courier(auth_token=os.getenv('COURIER_PK'))


def sendOTP(email, otp):
    resp = client.send_message(
        message={
            "to": {
                "email": email
            },
            "content": {
                "title": "OTP to Authenticate on MedConnect!!",
                "body": f"Hi!! Continue your Authenctication Process by using this OTP: {otp}"
            }
        }
    )
    print('in send', otp, email)

def sendAdminMail(message,to_email):
    resp = client.send_message(
        message={
            "to": {
                "email": to_email
            },
            "content": {
                "title": "You have a Query on InfoBot!!",
                "body": message
            }
        }
    )

def sendReplyMail(from_email, username, to_email, reply):
    resp = client.send_message(
        message={
            "to": {
                "email": to_email
            },
            "content": {
                "title": f"Reply from {from_email}: {username} via InfoBot",
                "body": reply
            }
        }
    )