const apiURL = 'https://noroff-assignment-api-lit.herokuapp.com'
const apiKey = "ByvuHqRoCVXC9G9Z06xa3ec9rDXYgZyJZRDXJ9k3arjVxy2AuUXX6c34Z2dgnlx2";

const TrianerAPI = {
	// // GET: user from DB
	// async getUser(trainerName) {
	// 	return await axios.get(`${apiURL}/translations?username=${trainerName}`).then(response =>
	// 		response.data
	// 	).catch(error => console.log(error))
	// },
	// // POST: user to DB
	// async setNewUser(username) {
	// 	const user = { username: username, translations: [] };
	// 	const headers = {
	// 		headers: {
	// 			"X-API-Key": apiKey,
	// 			"Content-Type": "application/json",
	// 		}
	// 	};
	// 	return await axios
	// 		.post(`${apiURL}/translations?username=${username}`, user, headers)
	// 		.then((response) => response.data)
	// 		.catch((error) => console.log(error.response));
	// },
};
export default TrianerAPI
