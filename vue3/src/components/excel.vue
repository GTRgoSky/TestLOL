<template>
    <div id="tsy">
        
    </div>
</template>

<script>
import XLSX from 'xlsx';
export default {
    mounted() {
        this.exportExcle();
    },
    methods: {
        exportExcle() {

        // 使用 XLSX.utils.aoa_to_sheet(excleData);
            // const excleData = [
            //     ['周一', '周二', '周三', '周四', '周五'],
            //     ['语文', '数学', '历史', '政治', '英语'],
            //     ['数学', '数学', '政治', '英语', '英语'],
            //     ['政治', '英语', '历史', '政治', '数学'],
            // ];

        // 使用 XLSX.utils.json_to_sheet(excleData);
            const excleData = [
                {周一: '语文', 周二: '数学', 周三: '历史', 周四: '政治', 周五: '英语'},
                {周一: '数学', 周二: '数学', 周三: '政治', 周四: '英语', 周五: '英语'},
                {周一: '政治', 周二: '英语', 周三: '历史', 周四: '政治', 周五: '数学'},
            ];

            // 设置表格样式，!cols为列宽
            const options = {
            '!cols': [
                    { wpx: 100 },
                    { wpx: 100 },
                    { wpx: 100 },
                    { wpx: 100 },
                    { wpx: 100 },
            ]};
        // 制作工作表的方式有很多种，以数组和对象为例
            // const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(excleData);
            const worksheet = XLSX.utils.json_to_sheet(excleData);

        // 使用指定的单元格作为起点插入数据，r：行， c：列，详情看官网文档
            // XLSX.utils.sheet_add_aoa(worksheet, [[“数学”，“语文”], [“政治”，“语文”], [“历史”，“政治”], ], {origin: {r: 2, c: 5}});
            // worksheet['!cols'] = options['!cols'];

            // 新建一个工作簿
            const workbook = XLSX.utils.book_new();

            /* 将工作表添加到工作簿*/
            // XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
            
            document.getElementById('tsy').innerHTML = XLSX.utils.sheet_to_html(worksheet, {
                id: 'te',
                editable: true,
                header: '<div>',
                footer: '</div>'
            })
            /* 输出工作表， 由文件名决定的输出格式*/
            // XLSX.sheet_to_html(workbook, '排庭表.xlsx');
        }
    },
}
</script>