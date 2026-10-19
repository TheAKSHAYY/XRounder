# BCA-302N: Introduction to Data Science
## Unit 2 Master Exam Revision Notes: Data Collection and Data Pre-Processing
**Target Examination:** MJPRU Bareilly BCA Semester 6 (CBCS Pattern 2024–25)
**Unit Identifier:** `2a7f47ac-c05c-5763-9251-f8d90031747f` | **Weightage:** 15–20 Marks in University Exam

---

### 📋 Official MJPRU Syllabus Topic Checklist
- [x] **Data Collection Strategies: Primary vs Secondary Sources, APIs & Web Scraping**
- [x] **Data Pre-Processing Overview & The Garbage-In Garbage-Out Principle**
- [x] **Data Cleaning: Handling Missing Data (Mean/Median Imputation, Dropping, KNN)**
- [x] **Noisy Data Smoothing: Binning Methods, Clustering & Regression Smoothing**
- [x] **Outlier Detection: Z-Score, Interquartile Range (IQR) & Isolation Forests**
- [x] **Data Integration: Handling Redundancy, Correlation Analysis & Chi-Square Tests**
- [x] **Data Transformation: Normalization (Min-Max Scaling) & Standardization (Z-Score)**
- [x] **Data Transformation: Log Transforms, Box-Cox & Categorical Encoding (One-Hot, Label)**
- [x] **Data Reduction Strategies: Dimensionality Reduction Concepts & Feature Selection**
- [x] **Principal Component Analysis (PCA) Fundamentals & Eigenvector Decomposition**
- [x] **Numerosity Reduction: Sampling Strategies, Clustering & Aggregation**
- [x] **Data Discretization: Equal-Width, Equal-Frequency Binning & Concept Hierarchy**

---

## 📌 Section A: High-Yield Very Short Answer Questions (2 Marks Each)
*Target: Write precise, definition-focused answers in 2–3 sentences or structured tables to secure maximum marks.*

### Q1. [2 Marks] What is the primary objective of Data Pre-Processing?
**Model Answer:**
Raw real-world data is typically incomplete (missing values), noisy (outliers, errors), and inconsistent. Data pre-processing cleans, transforms, and reduces data into a coherent format suitable for machine learning models.

### Q2. [2 Marks] Name three common mechanisms of Missing Data.
**Model Answer:**
1. **MCAR (Missing Completely at Random):** Missingness is entirely independent of observed and unobserved data.
2. **MAR (Missing at Random):** Missingness systematically depends on observed variables but not unobserved ones.
3. **MNAR (Missing Not at Random):** Missingness depends directly on the unobserved value itself.

### Q3. [2 Marks] What is Mean/Median Imputation and when is Median preferred?
**Model Answer:**
Replacing missing numerical values with the mean or median of observed values. **Median** is preferred when the feature distribution is skewed or contains extreme outliers, as mean is sensitive to extreme values.

### Q4. [2 Marks] Define Min-Max Feature Scaling and its mathematical formula.
**Model Answer:**
Linear rescaling of data into a fixed range, usually $[0, 1]$:
$$x_{\text{scaled}} = \frac{x - x_{\min}}{x_{\max} - x_{\min}}$$

### Q5. [2 Marks] Define Z-score Standardization and its mathematical formula.
**Model Answer:**
Rescaling features so that they have a mean $\mu = 0$ and standard deviation $\sigma = 1$:
$$z = \frac{x - \mu}{\sigma}$$

### Q6. [2 Marks] What is One-Hot Encoding and what issue does it introduce in high-cardinality features?
**Model Answer:**
Converting categorical levels into binary vector columns. For high-cardinality features, it causes **curse of dimensionality** and extreme sparse matrix overhead ('dummy variable trap').

### Q7. [2 Marks] What is Data Discretization?
**Model Answer:**
The transformation of continuous numerical attributes into discrete interval or categorical bins (e.g., converting Age into Child, Youth, Adult, Senior).

### Q8. [2 Marks] Differentiate between Equal-Width and Equal-Frequency Binning.
**Model Answer:**
- **Equal-Width Binning:** Divides the range $[x_{\min}, x_{\max}]$ into $k$ intervals of identical width $w = (x_{\max} - x_{\min})/k$.
- **Equal-Frequency Binning:** Divides sorted data into $k$ intervals such that each bin contains roughly $N/k$ sample records.

### Q9. [2 Marks] What is Principal Component Analysis (PCA) used for in data reduction?
**Model Answer:**
**PCA** is an unsupervised linear dimensionality reduction technique that orthogonalizes correlated features into principal components ranked by explained variance, maximizing information retention while reducing dimensions.

### Q10. [2 Marks] What is Data Deduplication in ETL pipelines?
**Model Answer:**
The identification and merging or deletion of duplicate, redundant, or near-identical records using primary keys, fuzzy string matching (Levenshtein distance), or record linkage algorithms.


---

## 📌 Section B: Conceptual Short Answer Questions (5 Marks Each)
*Target: Provide structured answers in 150–200 words with headings, block diagrams, and comparison matrices.*

### Q1. [5 Marks] Explain Outlier Detection Techniques: IQR Rule vs Z-Score Method.
**Model Answer:**
### Outlier Detection Foundations

1. **IQR (Interquartile Range) Method (Tukey's Fences):**
   - $\text{IQR} = Q_3 - Q_1$
   - Lower Bound = $Q_1 - 1.5 \times \text{IQR}$
   - Upper Bound = $Q_3 + 1.5 \times \text{IQR}$
   - Non-parametric; highly robust against extreme skewness.

2. **Z-Score Method (Parametric):**
   - $z = \frac{x - \mu}{\sigma}$
   - A point is classified as an outlier if $|z| > 3$ (outside 99.7% confidence interval under Gaussian distribution).
   - Sensitive to sample size and heavily skewed distributions.

### Q2. [5 Marks] Compare Strategies for Handling Missing Values: Deletion vs Imputation.
**Model Answer:**
| Strategy | Advantages | Disadvantages | Best Used When |
| :--- | :--- | :--- | :--- |
| **Listwise Deletion** | Simple, introduces no synthetic values | Discards vast amounts of data, introduces bias | Missing rows $< 2\%$ and MCAR |
| **Mean/Median Imputation** | Preserves sample size, simple | Distorts feature variance and covariance | Moderate missingness, simple baseline |
| **KNN Imputation** | Preserves localized non-linear relationships | Computationally heavy $O(N^2)$ at inference | Correlated tabular features |
| **Iterative MICE (Chained Eq.)**| High statistical fidelity, models uncertainty | High complexity, assumes linear assumptions | Complex survey and medical datasets |

### Q3. [5 Marks] Detail the Process and Need for Data Discretization and Concept Hierarchies.
**Model Answer:**
### Data Discretization Architecture
Continuous data often contains noise and micro-variations that degrade rule induction and tree-based performance. Discretization constructs compact representations:
1. **Unsupervised Discretization:**
   - Equal-width binning (sensitive to outliers).
   - Equal-frequency binning (good for non-uniform data).
   - K-means clustering-based binning.
2. **Supervised Discretization:**
   - Entropy-based discretization (MDLP): Maximizes information gain between target classes and bin boundaries.
   - ChiMerge: Uses $\chi^2$ statistics to iteratively merge adjacent intervals that exhibit identical class distributions.
3. **Concept Hierarchies:** Rolling up atomic data into higher abstractions (Street $\to$ City $\to$ State $\to$ Country).

### Q4. [5 Marks] Explain Data Integration Challenges: Schema Integration, Redundancy, and Entity Identification.
**Model Answer:**
Integrating heterogeneous enterprise databases presents three core technical hurdles:
1. **Entity Identification Problem:** Matching real-world entities across disparate sources where schema attributes differ (e.g., `cust_id` vs `client_no`, or fuzzy name matching `A. Sharma` vs `Akshay Sharma`).
2. **Schema Conflicts:** Structural divergence (e.g., currency in USD vs INR, imperial vs metric units, date formats `YYYY-MM-DD` vs `DD/MM/YYYY`).
3. **Redundancy & Correlation Analysis:** Redundant attributes inflate computational load. Detected via **Pearson's Product-Moment Coefficient** for numerical variables or **Chi-Square ($\chi^2$) Contingency Tests** for nominal attributes.

### Q5. [5 Marks] Differentiate Between Feature Selection and Feature Extraction in Data Reduction.
**Model Answer:**
### Data Reduction Taxonomy
- **Feature Selection:** Chooses an optimal subset $d$ from original $D$ features *without altering their original semantics*. Methods include:
  - *Filter Methods:* Pearson correlation, ANOVA F-test, Mutual Information.
  - *Wrapper Methods:* Recursive Feature Elimination (RFE), Forward Stepwise Selection.
  - *Embedded Methods:* LASSO ($L_1$ regularization) driving non-essential coefficients to exact zero.
- **Feature Extraction:** Transforms the original high-dimensional space into a *new, lower-dimensional synthetic coordinate space* (e.g., PCA, LDA, t-SNE, Autoencoders). Preserves variance while losing direct human interpretability of raw features.


---

## 📌 Section C: Comprehensive Long Answer Descriptive Questions (10–15 Marks Each)
*Target: Elaborate answers in 400–600 words featuring complete architectural diagrams, full code implementations, mathematical derivations, or real-world enterprise case studies.*

### Q1. [10/15 Marks] Provide a Complete Mathematical and Algorithmic Derivation of Principal Component Analysis (PCA) for Dimensionality Reduction.
**Comprehensive University Solution:**
### Mathematical Derivation of PCA

```
[ Raw Data Matrix X (N x D) ]
              |
              v
[ Zero-Mean Centering: X_c = X - mu ]
              |
              v
[ Covariance Matrix: Sigma = (1/N) * X_c^T * X_c ]
              |
              v
[ Eigen-Decomposition: Sigma * v_i = lambda_i * v_i ]
              |
              v
[ Sort Eigenvalues lambda_1 >= lambda_2 >= ... >= lambda_D ]
              |
              v
[ Projection Matrix W_k = [v_1, v_2, ..., v_k] (D x k) ]
              |
              v
[ Reduced Dimension Matrix Z = X_c * W_k (N x k) ]
```

#### 1. Standardization
Given dataset $X \in \mathbb{R}^{N \times D}$, calculate column-wise means $\mu_j$ and zero-center: $\tilde{x}_{ij} = x_{ij} - \mu_j$.

#### 2. Covariance Matrix Calculation
$$\Sigma = \frac{1}{N} \tilde{X}^T \tilde{X} \quad (D \times D \text{ symmetric positive semi-definite matrix})$$
where $\Sigma_{jk} = \text{Cov}(X_j, X_k)$.

#### 3. Eigendecomposition
Solve the characteristic equation for eigenvalues $\lambda$ and eigenvectors $v$:
$$\det(\Sigma - \lambda I) = 0 \implies \Sigma v = \lambda v$$

#### 4. Selection and Explained Variance
Sort eigenvalues in descending order: $\lambda_1 \ge \lambda_2 \ge \dots \ge \lambda_D$.
The fraction of total variance explained by the top $k$ components is:
$$\text{Explained Variance Ratio} = \frac{\sum_{i=1}^k \lambda_i}{\sum_{j=1}^D \lambda_j}$$

#### 5. Orthogonal Projection
Form transformation matrix $W_k = [v_1, v_2, \dots, v_k] \in \mathbb{R}^{D \times k}$.
The dimensionally reduced dataset is:
$$Z = \tilde{X} W_k \in \mathbb{R}^{N \times k}$$

### Q2. [10/15 Marks] Design and Implement an Industrial-Strength Data Cleaning Pipeline in Python using Pandas and Scikit-Learn.
**Comprehensive University Solution:**
### Production Data Pre-Processing Implementation

```python
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, RobustScaler

def build_industrial_preprocessor(numerical_cols, categorical_cols):
    """
    Constructs an enterprise-grade scikit-learn preprocessing pipeline:
    - Numerical: Median imputation + Outlier-resistant RobustScaler.
    - Categorical: Most frequent imputation + OneHotEncoder with unknown handling.
    """
    num_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', RobustScaler(with_centering=True, with_scaling=True))
    ])
    
    cat_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='most_frequent')),
        ('encoder', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
    ])
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', num_transformer, numerical_cols),
            ('cat', cat_transformer, categorical_cols)
        ],
        remainder='drop' # Explicitly prevent leakage of raw non-indexed fields
    )
    return preprocessor

# Execution Example
if __name__ == '__main__':
    df = pd.DataFrame({
        'age': [25, 42, np.nan, 36, 120], # Outlier 120
        'income': [50000, 85000, 62000, np.nan, 1200000],
        'education': ['BCA', 'MCA', 'BCA', 'B.Tech', np.nan]
    })
    pipeline = build_industrial_preprocessor(['age', 'income'], ['education'])
    transformed = pipeline.fit_transform(df)
    print('Transformed Feature Matrix Shape:', transformed.shape)
```

#### Architecture Principles:
1. **Zero Data Leakage:** Imputation statistics (median) and scaling quantiles are fit strictly on training splits.
2. **Robustness to Extreme Outliers:** `RobustScaler` scales data according to the IQR, preventing extreme values from compressing standard deviation.

### Q3. [10/15 Marks] Critically Analyze Missing Data Mechanisms (MCAR, MAR, MNAR) and Modern Multiple Imputation by Chained Equations (MICE).
**Comprehensive University Solution:**
### Theoretical Framework of Missing Data & MICE

#### 1. Rubin's Typology of Missing Data
- **MCAR:** $P(M | Y_{\text{obs}}, Y_{\text{mis}}) = P(M)$. Example: Laboratory blood sample tube drops and shatters accidentally.
- **MAR:** $P(M | Y_{\text{obs}}, Y_{\text{mis}}) = P(M | Y_{\text{obs}})$. Example: Elderly patients are less likely to report income, but conditional on age, missingness is random.
- **MNAR:** $P(M | Y_{\text{obs}}, Y_{\text{mis}})$ depends directly on $Y_{\text{mis}}$. Example: High-income individuals refusing to disclose net wealth due to taxation privacy concerns.

#### 2. The MICE Algorithm (Chained Equations)
MICE operates under the Fully Conditional Specification (FCS) paradigm:
1. **Step 1:** Initialize missing values with random draws from observed data.
2. **Step 2:** For each variable $Y_j$ with missing values ($j = 1, \dots, p$):
   - Set $Y_j$ back to missing.
   - Fit a regression model of $Y_j$ on all other variables $Y_{-j}$ using observed cases: $Y_j \sim f(Y_1, \dots, Y_{j-1}, Y_{j+1}, \dots, Y_p)$.
   - Impute missing values in $Y_j$ by sampling from the posterior predictive distribution of the fitted model.
3. **Step 3:** Repeat Step 2 cyclically for $T$ iterations (typically 10–20) until convergence is achieved.
4. **Step 4:** Generate $m$ distinct imputed datasets to account for imputation uncertainty, run downstream modeling on all $m$ datasets, and pool parameters using Rubin's Rules.


---

## 💡 Exam Hall Strategy & Examiner Insights for this Unit
Examiners frequently test: IQR outlier detection rule (5 marks), Min-Max vs Z-Score formulas (2/5 marks), and PCA mathematical steps (10/15 marks).

---
*Verified against official MJPRU BCA 2024–25 Syllabus by XRounder Academic Team.*