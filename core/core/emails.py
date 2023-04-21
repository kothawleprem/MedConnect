from django.core.mail import EmailMessage, EmailMultiAlternatives
from django.template.loader import render_to_string
import requests

def sendOTP(email, otp):
    subject = "Verify your Email for MedConnect"
    html_message = f"<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Document</title></head><body><div><div style='background-color:#ffa114;height:244px;width:auto;top:-0px;'><div style='text-align:center;'><br><br><img src='https://www.linkpicture.com/q/MedConnect.png'></div></div><center><div style='background-color:#ffffff;height:750px;width:600px;margin:10px;margin-left:-500px;filter:drop-shadow(0px 4px 60px rgba(0,0,0,0.05000000074505806));left:243px;top:-125px;position:relative;'><div><br><div style='font-size:40px;font-weight:700;'>Welcome!</div><br><img src='https://i.ibb.co/p2tPKY8/email.png'><div style='font-size:35px;font-weight:700;'>Verify your email</div><br><div style='font-size:24px;font-weight:700;color:#929292;'>Here is yours one time password</div><br><div style='font-size:58px;font-weight:700;'>{otp}</div><br><div style='font-size:20px;color:#ffa114;font-weight:700;'>Copy OTP</div><br><div style='font-size:24px;font-weight:700;color:#929292;'>Valid for 10 minutes only</div><br><br><br><div style='background-color:#ffeecd;height:168px;width:555px;margin-top:20px;'><br><br><br><div style='font-size:20px;font-weight:700;'>Need more help!</div><div style='font-size:20px;color:#ffa114;font-weight:500;'>support@medconnect.com</div></div></div></div></center></div></body></html>"
    image1_url = 'https://i.ibb.co/p2tPKY8/email.png'
    image2_url = 'https://www.linkpicture.com/q/MedConnect.png'
    image1_data = requests.get(image1_url).content
    image2_data = requests.get(image2_url).content
    # message = EmailMessage(subject=subject, body=html_message, to=[email])
    # message.content_subtype = 'html'  # Set the content subtype to 'html'
    # message.send()
    email_message = EmailMultiAlternatives(subject, '', to=[email])
    email_message.attach_alternative(html_message, "text/html")

    # Attach the images to the email message
    email_message.attach('MedConnect.png', image1_data, 'image/png')
    email_message.attach('email.png', image2_data, 'image/png')
    email_message.send()
    print("email sent")

def email_prescription(email, patient_name, dr_name, rx_link):
    print(rx_link)
    subject = "Your Prescription from MedConnect is here."
    html_message = f'<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Document</title></head><body><div><div style="background-color: #ffa114; height: 244px; width: auto; top: -0px"><div style="text-align: center"><br /><br /><img src="https://www.linkpicture.com/q/MedConnect.png" /></div></div><center><div style="background-color: #ffffff; height: 750px; width: 600px; margin: 10px; margin-left: -500px; filter: drop-shadow(0px 4px 60px rgba(0, 0, 0, 0.05000000074505806)); left: 243px; top: -125px; position: relative;"><div style="text-align: justify;" ><br /><center><img src="https://i.ibb.co/vQwL80R/rximage.png" /></center><center><div style="font-size: 35px; font-weight: 700" >We’ve got your prescription</div></center><br /><div style="font-size: 24px; font-weight: 700; color: #929292; margin: 10px;" >Hello {patient_name},<br><br>Dr {dr_name} sent you the following prescription for your today’s appointment you can check and download your prescription  using bellow link.<br /><br /><center><a style="display: inline-block; padding: 10px 20px; background-color: black; color: white; border-radius: 10px; text-decoration: none;" target="_blank" href={rx_link} >Download Now</a></center><br /><div style="background-color: #ffeecd; height: 168px; width: 555px; margin-top: 20px;"><br /><br /><br /><center><div style="font-size: 20px; font-weight: 700">Need more help!</div><div style="font-size: 20px; color: #ffa114; font-weight: 500">support@medconnect.com</div></center></div></div></div></center></div></body></html>'
    email_message = EmailMultiAlternatives(subject, '', to=[email])
    email_message.attach_alternative(html_message, "text/html")
    email_message.send()
    print("email sent")

