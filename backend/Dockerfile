# שימוש בתמונה רשמית של Node.js בגרסה 18
FROM node:18

# הגדרת תיקיית העבודה בתוך הקונטיינר
WORKDIR /app

# העתקת קבצי package.json ו-package-lock.json להתקנת תלויות
COPY package*.json ./

# התקנת כל התלויות
RUN npm install

# העתקת כל קבצי הפרויקט לתוך הקונטיינר
COPY . .

# פתיחת פורט 5002 (כמו שהשרת מאזין אליו)
EXPOSE 5002

# הפקודה להרצת השרת
CMD ["node", "server.js"]
