class UserDailyActivity {
  constructor(data) {
    this.data = data;
  }

  getFormattedData() {
    const minWeight = Math.min(...this.data.map((entry) => entry.kilogram)) - 1;
    const maxWeight = Math.max(...this.data.map((entry) => entry.kilogram)) + 1;

    const formattedData = this.data.map((entry) => ({
      day: entry.day,
      kilogram: entry.kilogram,
      calories: entry.calories,
    }));

    return {
      formattedData,
      minWeight,
      maxWeight,
      // originalData: this.data, // Ajouter originalData pour renvoyer les données d'origine
    };
  }
}

class UserAverageSessions {
  constructor(data) {
    this.data = data;
  }

  getFormattedData() {
    const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];

    // Parcourir les données de session
    this.data.user_average_sessions.forEach((user) => {
      user.sessions.forEach((session) => {
        // Convertir le numéro de jour en français
        session.day = daysOfWeek[session.day - 1];
      });
    });

    return this.data;
  }
}


class UserPerformance {
  constructor({ kind, data }) {
    this.data = data;
    this.kind = kind;
  }

  getFormattedData() {
    const frenchNames = {
      1: "Cardio",
      2: "Energie",
      3: "Endurance",
      4: "Force",
      5: "Vitesse",
      6: "Intensité"
    };

    return this.data.reverse().map((item) => ({
      value: item.value,
      kind: frenchNames[item.kind]
    }));
  }
}



export { UserDailyActivity, UserAverageSessions, UserPerformance}
