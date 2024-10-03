"use client";
import { SearchProduct } from "@/app/products/products.api";
import { AutoComplete, Input } from "antd";
import type { AutoCompleteProps } from "antd";
import React, { useState } from "react";

export function SearchComponent() {
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);

  const handleSearch = async (value: string) => {
    if (value ){
      const results = await SearchProduct(value);
      const mappedOptions = results.map((product: { name: string }) => ({
        value: product.name,
      }))
      setOptions(mappedOptions)
    }else {
      setOptions([]);
    }
  };

  
  const onSelect = (value: string) => {
    console.log("onSelect", value);
  };
  return (
    <div>
      <AutoComplete
        popupMatchSelectWidth={252}
        style={{ width: 300 }}
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
        size="large"
      >
        <Input.Search size="large" placeholder="input here" enterButton />
      </AutoComplete>
    </div>
  );
}
