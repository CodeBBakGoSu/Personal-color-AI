import requests
import json

API_URL = "https://api.x.ai/v1/chat/completions"
API_KEY = "xai-K80PvsOrUsTYyHoRBfkJEszACAtw8B5peHHwWS4EM9YxMA2ZtrBhHUNhcMIB3TMyMKx69yZ8bqYk2z9w"

def get_personal_color_recommendation(skin_rgb, eye_rgb, hair_rgb):
    prompt = f"""
    다음 RGB 값이 주어졌습니다:
    - 피부색: {skin_rgb}
    - 눈 색상: {eye_rgb}
    - 머리카락 색상: {hair_rgb}

    이 정보를 바탕으로 해당 사람의 퍼스널 컬러 계절(봄, 여름, 가을, 겨울)을 결정해주세요.
    이 계절을 기반으로 이 퍼스널 컬러 타입에 가장 잘 어울리는 3가지 유형의 패션 아이템(의류 색상, 액세서리 또는 메이크업 색조 등)을 추천해주세요.
    추천 시 구체적으로 설명해주세요.
    """

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }

    data = {
        "messages": [
            {"role": "system", "content": "당신은 퍼스널 컬러와 패션 추천 전문가입니다."},
            {"role": "user", "content": prompt}
        ],
        "model": "grok-beta",
        "stream": False,
        "temperature": 0.7
    }

    response = requests.post(API_URL, headers=headers, data=json.dumps(data))

    if response.status_code == 200:
        result = response.json()
        fashion_recommendation = result['choices'][0]['message']['content'].strip()
        return fashion_recommendation
    else:
        return f"오류: {response.status_code}, {response.text}"

# 예시: 피부색, 눈 색상, 머리카락 색상의 RGB 값 입력
skin_rgb = [255, 224, 189]  # 예시 피부 색상 RGB 값
eye_rgb = [102, 51, 51]     # 예시 눈 색상 RGB 값
hair_rgb = [102, 76, 62]    # 예시 머리카락 색상 RGB 값

# 패션 아이템 추천 요청
recommendation = get_personal_color_recommendation(skin_rgb, eye_rgb, hair_rgb)
print("패션 아이템 추천:")
print(recommendation)
