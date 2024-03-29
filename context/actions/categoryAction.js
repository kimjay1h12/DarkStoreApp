import client from "../../api/client";

export const getAllCategory = async (dispatch) => {
  dispatch({
    type: "LOADING",
  });
  try {
    const p = (
      await client.get(`/category`)
    ).data;
    console.log("cartegory", p);
    dispatch({
      type: "FETCHED_DATA",
      payload: p.data,
    });
    console.log(p.data);
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: error.response?.data?.message || "Couldn't get cart",
    });
    console.log("Error Getting Collections", error.response);
  }
};
export const createAdminCategory = async (dispatch, data) => {
  dispatch({
    type: "LOADING",
  });
  try {
    const p = (await client.post(`/category`, data)).data;
    console.log("cartegory", p);
    getAllCategory(dispatch);
    return true;
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: error.response?.data?.message || "Couldn't get cart",
    });
    console.log("Error Getting Collections", error.response);
  }
};
export const deleteAdminCategory = async (dispatch, data) => {
  dispatch({
    type: "LOADING",
  });
  try {
    const p = (await client.delete(`category/${data}`))
      .data;
    // console.log("cartegory", p);
    getAllCategory(dispatch);
    alert("Category deleted successfully");
    return true;
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: error.response?.data?.message,
    });
    console.log("Error deleting category", error.response);
  }
};
