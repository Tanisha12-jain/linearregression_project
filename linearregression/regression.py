import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

# Step 1: Load the Excel file
df = pd.read_excel('first_35_people_dataset.xlsx')

# Step 2: Choose input and output columns
X = df[['age']]     # Feature as DataFrame
y = df['chol']      # Target to predict

# Step 3: Create and train the model
model = LinearRegression()
model.fit(X, y)

# Step 4: Predict values
y_pred = model.predict(X)

# Step 5: Plot the results
plt.scatter(X['age'], y, color='blue', label='Actual Data')
plt.plot(X['age'], y_pred, color='red', label='Prediction Line')
plt.xlabel('Age')
plt.ylabel('Cholesterol')
plt.title('Linear Regression: Age vs Cholesterol')
plt.legend()
plt.grid(True)
plt.show()