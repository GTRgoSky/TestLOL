/**
 * 一:位运算
 * 
 * Input: [2,2,1]
    Output: 1

 * Input: [4,1,2,1,2]
    Output: 4
 */

var singleNumber = function (nums) {
	return nums.reduce((a, b) => a ^ b, 0);
};

// 利用^位运算, 在二进制中,相同位-相同值返回0,不同值返回1.最终返回二进制数字
