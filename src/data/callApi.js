const apiUrl= "http://localhost:3000"

async function getUser(userId) {
  try {
    const response = await fetch(`${apiUrl}/user/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch API data");
    }
    const userDataResponse = await response.json();
    console.log("API data:", userDataResponse);
    const userApiData = userDataResponse.data;
    return userApiData;
  } catch (error) {
    console.error("Error fetching API data:", error);
    try {
      const response = await fetch(`../db.json`);
      if (!response.ok) {
        throw new Error("Failed to fetch local data");
      }
      const allUserData = await response.json();
      console.log("Local data:", allUserData);
      const user = allUserData.user_main_data.find(
        (mainData) => mainData.id === userId
      );
      if (user) {
        const userMockUpData = user;
        console.log(userMockUpData);
        return userMockUpData;
      } else {
        throw new Error("User not found in local data");
      }
    } catch (error) {
      console.error("Error fetching local data:", error);
    }
  }
}

async function getUserActivity(userId) {
  try {
    const response = await fetch(
      `${apiUrl}/user/${userId}/activity`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch API data");
    }
    const userDataResponse = await response.json();
    console.log("API data:", userDataResponse);
    const userApiData = userDataResponse.data;
    return userApiData;
  } catch (error) {
    console.error("Error fetching API data:", error);
    try {
      const response = await fetch(`../db.json`);
      if (!response.ok) {
        throw new Error("Failed to fetch local data");
      }
      const allUserData = await response.json();
      console.log("Local data:", allUserData);
      const user = allUserData.user_activity.find(
        (activity) => activity.userId === userId
      );
      if (user) {
        const userMockUpData = user;
        console.log(userMockUpData);
        return userMockUpData;
      } else {
        throw new Error("User not found in local data");
      }
    } catch (error) {
      console.error("Error fetching local data:", error);
    }
  }
}

async function getAverageSessions(userId) {
  try {
    const response = await fetch(
      `${apiUrl}/user/${userId}/average-sessions`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch API data");
    }
    const userDataResponse = await response.json();
    console.log("API data:", userDataResponse);
    const userApiData = userDataResponse.data;
    return userApiData;
  } catch (error) {
    console.error("Error fetching API data:", error);
    try {
      const response = await fetch(`../db.json`);
      if (!response.ok) {
        throw new Error("Failed to fetch local data");
      }
      const allUserData = await response.json();
      console.log("Local data:", allUserData);
      const user = allUserData.user_average_sessions.find(
        (sessions) => sessions.userId === userId
      );
      if (user) {
        const userMockUpData = user;
        console.log(userMockUpData);
        return userMockUpData;
      } else {
        throw new Error("User not found in local data");
      }
    } catch (error) {
      console.error("Error fetching local data:", error);
    }
  }
}

async function getUserPerformance(userId) {
  try {
    const response = await fetch(
      `${apiUrl}/user/${userId}/performance`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch API data");
    }
    const userDataResponse = await response.json();
    console.log("API data:", userDataResponse);
    const userApiData = userDataResponse.data;
    return userApiData;
  } catch (error) {
    console.error("Error fetching API data:", error);
    try {
      const response = await fetch(`../db.json`);
      if (!response.ok) {
        throw new Error("Failed to fetch local data");
      }
      const allUserData = await response.json();
      console.log("Local data:", allUserData);
      const user = allUserData.user_performance.find(
        (performance) => performance.userId === userId
      );
      if (user) {
        const userMockUpData = user;
        console.log(userMockUpData);
        return userMockUpData;
      } else {
        throw new Error("User not found in local data");
      }
    } catch (error) {
      console.error("Error fetching local data:", error);
    }
  }
}

export { getUser, getUserActivity, getAverageSessions, getUserPerformance };
