
export var options = {
    data:[[45,45,44,4,43]],
    minDimensions:[1,1],
    columns: [
        {type: 'numeric',title: 'Jan 2002', width: '80', decimal:'.' , mask:'#,##',},
        {type: 'numeric',title: 'Feb 2002', width: '80', decimal:'.' , mask:'#,##'},
        {type: 'numeric',title: 'Mar 2002', width: '80', decimal:'.' , mask:'#,##'},
        {type: 'numeric',title: 'Apr 2002', width: '80', decimal:'.' , mask:'#,##'},
        {type: 'numeric',title: 'May 2002', width: '80', decimal:'.' , mask:'#,##'},
    ],
    contextMenu: () => {},
    tableHeight: "300px",
    allowInsertRow: true,
};
 