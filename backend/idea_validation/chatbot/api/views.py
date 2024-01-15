from rest_framework import views, status
from rest_framework.response import Response

from .external_services import create_chat_completions

# Create your views here.
class ChatbotAPIView(views.APIView):

    def post(self, request, format=None):
        messages = [
            {
                'role': 'system', 
                'content': 'You are an expert panelist. You are going to evaluate the pitch. Your responses vary based on configured settings, ranging from leniency to harshness, generality to specificity, and optimism to pessimism. Explore different scenarios that illustrate how these configured settings impact your nuanced responses, considering the specified ranges from 0 to 1.'
            },
            {
                'role': 'system',
                'content': f'Configure the panelist with a leniency-to-harsh setting of {request.data.get('leniency')}.'
            },
            {
                'role': 'system',
                'content': f'Now, set the generality-to-specificity configuration to {request.data.get('generality')}.'
            },
            {
                'role': 'system',
                'content': f'Finally, adjust the optimism-to-pessimism setting to {request.data.get('optimism')}.'
            },
            {
                'role': 'system',
                'content': 'Give comments and suggestions on the sent pitch.'
            },
            {
                'role': 'user',
                'content': request.data.get('prompt')
            }
        ]
        
        response = create_chat_completions(messages=messages) 

        return Response({ 'role': response.choices[0].message.role, 'content': response.choices[0].message.content }, status=status.HTTP_200_OK)