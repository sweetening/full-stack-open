const bmiCalculator = (w: number, h: number) => {
  let bmi = w / (h*h);
  console.log(bmi);
  if (bmi <= .00185) {
    return "Underweight";
  } else if (bmi > .00185 && bmi <= .0025)
  {
    return "Normal (healthy weight)";
  } else if (bmi > .0025 && bmi <= .0030)
  {
    return "Overweight";
  } else {
    return "Obese";
  }
};

try {
  console.log(bmiCalculator(47, 161))
} catch (e) {
  console.log('Something went wrong, error message: ', e.message);
}

// 1. Divide weight (mass) by height squared.
// 2. Determine case of result: u, n, o, o.
// 3. Return case result.
