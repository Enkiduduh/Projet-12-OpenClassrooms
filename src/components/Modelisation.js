class userActivity {
  constructor(userId, sessions) {
    this.userId = userId;
    this.sessions = sessions;
  }

}

class userMainData {
  constructor(data) {
    this.data = data;
  }


  getFormattedData() {


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
  constructor(data) {
    this.data = data;
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

    // Inverser les données et mettre les noms français correspondants
    this.data.user_performance.forEach((user) => {
      user.data.reverse().forEach((performance) => {
        performance.kind = frenchNames[performance.kind];
      });
    });

    return this.data;
  }
}


export { userMainData, userActivity, UserAverageSessions, UserPerformance}
