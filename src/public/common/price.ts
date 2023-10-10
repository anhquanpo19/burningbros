const totalCount = (value: any) => {
	let total = 0;
	value?.forEach((item: any) => {
		total += item.total_price || item.discount_price;
	});
	return total.toLocaleString('vi-VN');
};

export { totalCount };
