const userHeight = document.querySelector("#user-height");
const userWeight = document.querySelector("#user-weight");
const userAge = document.querySelector("#user-age");
const userGender = document.querySelector("#user-gender");
const userActivityLevel = document.querySelector("#user-activity-level");
const cardBtn1 = document.querySelector("#card-btn1");
const cardBtn2 = document.querySelector("#card-btn2");
const cardBtn3 = document.querySelector("#card-btn3");

const showReqCalorie = document.querySelector("showReqCalorie");

const image1 = document.querySelector("#image1");
const image2 = document.querySelector("#image2");
const image3 = document.querySelector("#image3");


const ingredients = document.querySelector("#ingredients");
const steps = document.querySelector("#steps");
const equipment = document.querySelector("#equipment");

const breakfastHeading = document.querySelector("#breakfast-heading");
const lunchHeading = document.querySelector("#lunch-heading");
const dinnerHeading = document.querySelector("#dinner-heading");

const tooltip1 = document.querySelector("#tooltip1");
const tooltip2 = document.querySelector("#tooltip2");
const tooltip3 = document.querySelector("#tooltip3");

const card = document.querySelector("#cards");
const recipeCard = document.querySelector("#recipe-card");

const calorieMeter1 = document.querySelector("#calorie-meter1");
const calorieMeter2 = document.querySelector("#calorie-meter2");
const calorieMeter3 = document.querySelector("#calorie-meter3");

const showCalorie = [calorieMeter1, calorieMeter2, calorieMeter3];

const btn = document.querySelector("#btn");

btn.addEventListener("click", (event) => {
    event.preventDefault();

    let targetCalorie = calculateBMR();
    console.log(targetCalorie);

    showCalorie.innerHTML = targetCalorie;

    fetch(`https://api.spoonacular.com/mealplanner/generate?apiKey=f8f4bf6c77eb43a5a58f7f0e353c060b&timeFrame=day&targetCalories=${targetCalorie}`)
    .then(res => {
        return res.json();
    }).then(data => {
        console.log(data);
        showCard(data);

        var id1 = data.meals[0].id;
        var id2 = data.meals[1].id;
        var id3 = data.meals[2].id;

        showImg(id1, id2 , id3);
        
        card.style.display = 'flex';
        var idarr = [id1, id2, id3];

        for(let i = 0; i<3; i++){
            fetch(`https://api.spoonacular.com/recipes/${idarr[i]}/nutritionWidget.json?apiKey=f8f4bf6c77eb43a5a58f7f0e353c060b`)
            .then(res => {
                return res.json();
            }).then(data => {
                insertCalorie(data, i);
            });
        }
    });
    
})


const calculateBMR = () =>{
    let bmr = 0;
    if(userGender.value == "female"){
        bmr = (655.1 + (9.563 * userWeight.value) + (1.850 * userHeight.value) - (4.676 * userAge.value))
    }
    else{
        bmr = (66.47 + (13.75 * userWeight.value) + (5.003 * userHeight.value) - (6.755 * userAge.value))
    }
    let userBmr = bmr * userActivityLevel.value
    return userBmr
}







const showCard = (data) => {

    breakfastHeading.innerHTML = data.meals[0].title;
    lunchHeading.innerHTML = data.meals[1].title;
    dinnerHeading.innerHTML = data.meals[2].title;

    breakfastHeading.addEventListener("mouseover", () => {
        tooltip1.innerHTML = data.meals[0].title;
        tooltip1.style.visibility = "visible";
    })

    breakfastHeading.addEventListener("mouseleave", () => {
        tooltip1.style.visibility = "hidden";
    })

    lunchHeading.addEventListener("mouseover", () => {
        tooltip2.innerHTML = data.meals[1].title;
        tooltip2.style.visibility = "visible";
    })

    lunchHeading.addEventListener("mouseleave", () => {
        tooltip2.style.visibility = "hidden";
    })

    dinnerHeading.addEventListener("mouseover", () => {
        tooltip3.innerHTML = data.meals[2].title;
        tooltip3.style.visibility = "visible";
    })

    dinnerHeading.addEventListener("mouseleave", () => {
        tooltip3.style.visibility = "hidden";
    })

    cardBtn1.addEventListener("click", (event) =>{
        event.preventDefault();
        fetch(`https://api.spoonacular.com/recipes/${data.meals[0].id}/information?apiKey=f8f4bf6c77eb43a5a58f7f0e353c060b`)
        .then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
            showIngredients(data);
        });
        recipeCard.style.display = 'flex';
    })

    cardBtn2.addEventListener("click", (event) =>{
        event.preventDefault();
        fetch(`https://api.spoonacular.com/recipes/${data.meals[1].id}/information?apiKey=f8f4bf6c77eb43a5a58f7f0e353c060b`)
        .then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
            showIngredients(data);
        });
        recipeCard.style.display = 'flex';
    })
    
    cardBtn3.addEventListener("click", (event) =>{
        event.preventDefault();
        fetch(`https://api.spoonacular.com/recipes/${data.meals[2].id}/information?apiKey=f8f4bf6c77eb43a5a58f7f0e353c060b`)
        .then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
            showIngredients(data);
        });
        recipeCard.style.display = 'flex';
    })
}

const showIngredients = (data) => {
    ingredients.innerHTML = "<h3>INGREDENTS</h3>"
    steps.innerHTML="<h3>STEPS</h3>"
    equipment.innerHTML = "<h3>EQUIPMENT</h3>"
    for(let i = 0; i<data.extendedIngredients.length; i++){
        let ingre = document.createElement("p")
        ingre.innerHTML = data.extendedIngredients[i].aisle;
        ingredients.appendChild(ingre);
    }

    for(let i = 0; i<data.extendedIngredients.length; i++){
        let st = document.createElement("p")
        st.innerHTML = data.extendedIngredients[i].amount ? data.extendedIngredients[i].amount : "-";
        steps.appendChild(st);
    }

    for(let i = 0; i<data.extendedIngredients.length; i++){
        let eq = document.createElement("p")
        eq.innerHTML = data.extendedIngredients[i].measures.metric.unitLong?data.extendedIngredients[i].measures.metric.unitLong : "-";
        equipment.appendChild(eq);
    }
}

const showImg = (id1, id2, id3) =>{
    fetch(`https://api.spoonacular.com/recipes/${id1}/information?apiKey=f8f4bf6c77eb43a5a58f7f0e353c060b`)
    .then(res => {
        return res.json();
    }).then(data => {
        image1.setAttribute("src", data.image)
    });

    fetch(`https://api.spoonacular.com/recipes/${id2}/information?apiKey=f8f4bf6c77eb43a5a58f7f0e353c060b`)
    .then(res => {
        return res.json();
    }).then(data => {
        image2.setAttribute("src", data.image)
    });

    fetch(`https://api.spoonacular.com/recipes/${id3}/information?apiKey=f8f4bf6c77eb43a5a58f7f0e353c060b`)
    .then(res => {
        return res.json();
    }).then(data => {
        image3.setAttribute("src", data.image)
    });
}

const insertCalorie = (data, i) => {
    console.log(data)
    showCalorie[i].innerHTML = `<p>Calorie - ${data.bad[0].amount}</p>`;
    console.log(data.bad[0].amount)
}