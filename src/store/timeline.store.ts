import create from "zustand";

export const useStore = create((set: Function) => ({
  data: [],
  total: 0,
	page: 1,
	pageSize: 20,


	getInitialState: () => set(async state => {
		const response = await fetch(`http://localhost:8001/timeline_data/all?page=${state.page}&pageSize=${state.pageSize}`)
		.then(res => res.json());

	if (response.code === 0) {
		debugger;
		set({
			data: response.info.data,
			total: response.info.total,
		});
	}		
	})
}))