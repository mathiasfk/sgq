import React from "react";
import Table from "components/Table/Table.js";
import PropTypes from "prop-types";

export default function CustomTable(props) {
    const {
        content,
        columns,
      } = props;

    var translate = (from, dic) => {
        if (Object.keys(dic).indexOf(from) >= 0)
            return dic[from];
        return from;
    };

    var columnDic = columns || {};
    var head = content ? Object.keys(content[0]).map(col => translate(col,columnDic)) : [];
    var data = content ? content.map(item => Object.values(item)) : [];

    return (
        <Table
            tableHeaderColor="primary"
            tableHead={head}
            tableData={data}
        />
    );
}

CustomTable.propTypes = {
    content: PropTypes.arrayOf(PropTypes.object),
    columns: PropTypes.arrayOf(PropTypes.object),
  };