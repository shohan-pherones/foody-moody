const inputSearch = document.querySelector(".input-search");
const btnSearch = document.querySelector(".btn-search");
const mealsWrapper = document.querySelector(".meals-wrapper");

class Meal {
  constructor() {
    this._searchHandle();
  }

  _getMealData() {
    fetch(`https://forkify-api.herokuapp.com/api/search?q=${inputSearch.value}`)
      .then((res) => {
        if (!res.ok) throw new Error("Invalid search query");
      })
      .then((data) => this._renderMeal(data?.recipes))
      .catch((err) => this._renderErr(err.message))
      .finally(() => (mealsWrapper.style.opacity = 1));
  }

  _searchHandle() {
    btnSearch.addEventListener("click", () => {
      this._getMealData();
      inputSearch.value = "";
      mealsWrapper.innerHTML = "";
      mealsWrapper.style.opacity = 0;
    });
  }

  _renderMeal(meals) {
    meals.forEach((meal) => {
      console.log(meal);
      const html = `
        <div class="p-4 md:w-1/3">
          <div
            class="h-full border-2 border-gray-800 rounded-lg overflow-hidden"
          >
            <img
              class="lg:h-48 md:h-36 w-full object-cover object-center"
              src="${meal.image_url}"
              alt="Photo of ${meal.title}"
            />
            <div class="p-6">
              <h2
                class="tracking-widest text-xs title-font font-bold text-cyan-500 mb-1 uppercase"
              >
                ${meal.publisher}
              </h2>
              <h1 class="title-font text-2xl font-medium text-white mb-3">
              ${meal.title}
              </h1>
              <a
                class="text-pink-400 inline-flex items-center md:mb-2 lg:mb-0"
                href="${meal.source_url}"
                target="_blank"
                >See Recipe
                <svg
                  class="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      `;

      mealsWrapper.insertAdjacentHTML("beforeend", html);
    });
  }

  _renderErr(errMsg) {
    mealsWrapper.insertAdjacentText("beforeend", errMsg);
  }
}

const newMeal = new Meal();
