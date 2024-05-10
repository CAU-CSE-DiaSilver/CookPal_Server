import sys
import io
import json
import requests
from bs4 import BeautifulSoup

# 한글 출력을 위한 설정
sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding='utf-8')

def recipe_get(recipe) :
    link = f"https://www.10000recipe.com{recipe}"
    recipe_out = {}
    # 링크에서 html 가져오기
    resp = requests.get(link)
    if resp.status_code == 200:
        soup = BeautifulSoup(resp.text, "html.parser")
        script_tags = soup.find_all("script", type="application/ld+json")

        for script in script_tags:
            
            json_data = json.loads(script.string)
            if json_data["@type"] == "Recipe":
                recipe_out["name"] = json_data["name"]
                recipe_out["description"] = json_data["description"]
                recipe_out["image"] = json_data["image"]
                recipe_out["totalTime"] = json_data["totalTime"]
                recipe_out["recipeYield"] = json_data["recipeYield"]

                recipe_out["ingredients"] = []
                ingredients = json_data["recipeIngredient"]
                for ingredient in ingredients:
                    recipe_out["ingredients"].append(ingredient)
                
                recipe_out["recipe_list"] = []
                recipe_list = json_data["recipeInstructions"]
                for step in recipe_list :
                    if step["@type"] == "HowToStep":
                        recipe_out["recipe_list"].append({"step" : step["text"], "image" : step["image"]})
                
    print(recipe_out)

recipe_get(sys.argv[1])