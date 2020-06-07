import React from "react";
import Table from "components/Table/Table.js";
import PropTypes from "prop-types";

export default function CustomTable(props) {
    const {
        content,
        columns,
        onDelete
      } = props;

    var translate = (from, dic) => {
        if (Object.keys(dic).indexOf(from) >= 0)
            return dic[from];
        return from;
    };

    var columnDic = columns || {};
    var head = (content && content.length > 0) ? Object.keys(content[0]).map(col => translate(col,columnDic)) : [];
    var data = (content && content.length > 0) ? content.map(item => Object.values(item).map(e => String(e))) : [];

    return (
        <Table
            tableHeaderColor="primary"
            tableHead={head}
            tableData={data}
            onDelete={onDelete}
        />
    );
}

CustomTable.propTypes = {
    content: PropTypes.arrayOf(PropTypes.object),
    columns: PropTypes.arrayOf(PropTypes.object),
  };