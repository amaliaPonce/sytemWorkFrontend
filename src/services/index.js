export const getEstadoService = async (userId, userToken) => {
  try {
    if (!userId) {
      throw new Error("Se requiere un userId");
    }

    const latestRecord = await getLatestRecordService(userId, userToken);

    if (latestRecord && latestRecord.state) {
      const estadoMinusculas = latestRecord.state.toLowerCase();

      if (estadoMinusculas === 'inside') {
        return 'El usuario está dentro';
      } else if (estadoMinusculas === 'outside') {
        return 'El usuario está fuera';
      }
    }

    return 'Estado desconocido';
  } catch (error) {
    throw new Error("Error al obtener el estado actual del empleado: " + error.message);
  }
};

export const getLatestRecordService = async (userId, userToken) => {
  try {
    if (!userId) {
      throw new Error("Se requiere un userId");
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/estado?userId=${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `${userToken}`,
        },
      }
    );

    if (!response.ok) {
      const json = await response.json();
      throw new Error(json.message);
    }

    return await response.json();
  } catch (error) {
    throw new Error("Error al obtener el registro más reciente: " + error.message);
  }
};



export const getFichajesService = async (userId, userToken) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/fichajes`,
      {
        method: "GET",
        headers: {
          Authorization: `${userToken}`,
        },
      }
    );


    const json = await response.json();

    if (!response.ok) {
      console.error("getFichajesService: Response Error:", json.message);
      throw new Error(json.message);
    }


    return json.fichajes;
  } catch (error) {
    console.error("getFichajesService: Error Occurred:", error.message);
    throw new Error("Error al obtener el historial de fichajes: " + error.message);
  }
};

export const deleteUserByIdService = async (userId, userToken) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: ` ${userToken}`,
        },
      }
    );


    const json = await response.json();

    if (!response.ok) {
      console.error("deleteUserByIdService: Response Error:", json.message);
      throw new Error(json.message);
    }


    return json;
  } catch (error) {
    console.error("deleteUserByIdService: Error Occurred:", error.message);
    throw new Error("Error al eliminar el usuario: " + error.message);
  }
};

export const updateUserDetailsService = async (userId, userToken, formData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/${userId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `${userToken}`,
        },
        body: formData,
      }
    );


    if (!response.ok) {
      const json = await response.json();
      console.error("updateUserDetailsService: Response Error:", json.message);
      throw new Error(json.message);
    }

    const json = await response.json();

    return json;
  } catch (error) {
    console.error("updateUserDetailsService: Error Occurred:", error.message);
    throw new Error("Error al actualizar los detalles del usuario: " + error.message);
  }
};


export const getUserByIdService = async (userId, userToken) => {
  try {

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/profile/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `${userToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("getUserByIdService: Response Error:", response.status, response.statusText);
      throw new Error("Error al obtener los detalles del usuario: " + response.statusText);
    }

    const json = await response.json();

    if (!json || Object.keys(json).length === 0) {
      console.error("getUserByIdService: Response Error: Respuesta vacía.");
      throw new Error("Error al obtener los detalles del usuario: Respuesta vacía");
    }


    return json.data;
  } catch (error) {
    console.error("getUserByIdService: Error Occurred:", error.message);
    throw new Error("Error al obtener los detalles del usuario: " + error.message);
  }
};




export const registerService = async (name, email, password) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json(); // Parse the response data

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json; // Return the parsed response data
  } catch (error) {
    throw new Error("Error en el registro: " + error.message);
  }
};
export const loginService = async (body) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const errorData = await response.json();

    if (!response.ok) {
      if (errorData.message === "Credenciales inválidas.") {
        throw new Error("Credenciales inválidas. Por favor, verifica tu ID y contraseña.");
      } else {
        throw new Error(`Error en la solicitud: ${errorData.message}`);
      }
    }

    return errorData;
  } catch (error) {
    throw new Error(`Error en la solicitud: ${error.message}`);
  }
};


export const registerCheckinService = async (userToken) => {
  try {
    // Verificar que userToken no sea nulo o indefinido
    if (!userToken) {
      throw new Error("Token de usuario faltante");
    }


    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/checkin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${userToken}`,
      },
      body: JSON.stringify({}),
    });

    const errorData = await response.json();

    if (!response.ok) {
      throw Error(errorData.message);
    }

    return errorData;
  } catch (error) {
    throw new Error("Error al registrar checkin: " + error.message);
  }
};

export const registerCheckoutService = async (userToken) => {
  try {
    if (!userToken) {
      throw new Error("Token de usuario faltante");
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${userToken}`,
      },
      body: JSON.stringify({}),
    });

    const errorData = await response.json();

    if (!response.ok) {
      throw Error(errorData.message);
    }

    return errorData;
  } catch (error) {
    throw new Error("Error al registrar checkout: " + error.message);
  }
};

export const listUsersService = async (userToken) => {
  if (!userToken) {
    throw new Error("Token de usuario faltante");
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/profile`,
      {
        method: "GET",
        headers: {
          Authorization: `${userToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json.data;
  } catch (error) {
    throw new Error("Error al obtener la lista de usuarios: " + error.message);
  }
};

