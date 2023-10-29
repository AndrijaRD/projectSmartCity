import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

cols = ["sl", "sw", "pl", "pw", "class"]
data = pd.read_csv('iris.data', names=cols)

data["class"] = (data['class']=='Iris-virginica').astype(int)

print(data["class"].unique())
