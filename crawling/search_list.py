# 한국어 결과 출력을 위한 코드
#-*- coding: utf-8 -*-
import sys
import io
from urllib.request import urlopen
from bs4 import BeautifulSoup # http 크롤링
import urllib.parse
import json

sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')

def recipe_list(search) :
    # 검색어 링크 설정
    uni_search = urllib.parse.quote(search)
    link = f"https://www.10000recipe.com/recipe/list.html?q={uni_search}"

    # 링크에서 html 가져오기
    resp = urlopen(link)
    soup = BeautifulSoup(resp, "html.parser")

    # 요리 제목 가져오기
    title_result = soup.find_all("div", {"class" : "common_sp_caption_tit line2"})
    title = []
    for data in title_result :
        title.append(data.text.strip())

    recipe = []
    thumb_nail = []
    result = soup.find_all("div", {"class": "common_sp_thumb"})

    recipe_ignore_len = len('<a class="common_sp_link" href="')
    for data in result :
        data = str(data)

        # 레시피 링크 추출
        recipe_point_start = data.find('<a class="common_sp_link" href="') + recipe_ignore_len

        # 썸네일 이미지 링크 추출
        if(data.find('<span class="common_vod_label">')==-1) :
            recipe_point_end = data.find('">\n<img src="')
            thumb_nail_start = recipe_point_end + len('">\n<img src="')
        else :
            recipe_point_end = data.find('">\n<span class="common_vod_label">')
            thumb_nail_start = data.find('</span>\n<img src="') + len('</span>\n<img src="')
        
        recipe.append(data[recipe_point_start:recipe_point_end])

        thumb_nail_end = data.find('"/>\n</a>\n</div>')
        thumb_nail.append(data[thumb_nail_start:thumb_nail_end])

    recipe_list = []
    for i in range(len(title)) :
        recipe_list.append({"title" : f"{title[i]}", "recipe_link" : f"{recipe[i]}", "thumbnail_link" : f"{thumb_nail[i]}"})

    if(len(recipe_list)>0) :
        print(recipe_list)
    else :
        print([{}])



recipe_list(sys.argv[1])

