import * as helpers from "../";

describe("Add Items", () => {
  it("should add the item to preview list", () => {
    const newItem = {
      id: 1001,
      name: "Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens",
      dietaries: ["v", "ve", "df", "gf", "n!"],
    };

    const previewItems = [];
    const output = [newItem];

    expect(helpers.onAddItem(previewItems, newItem)).toEqual(output);
  });

  it("should not add the item to preview list", () => {
    const newItem = {
      id: 1001,
      name: "Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens",
      dietaries: ["v", "ve", "df", "gf", "n!"],
    };

    const previewItems = [newItem];
    const output = [newItem];

    expect(helpers.onAddItem(previewItems, newItem)).toEqual(output);
  });
});

describe("Remove Items", () => {
  it("should remove item from list", () => {
    const previewItems = [
      {
        id: 1001,
        name: "Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens",
        dietaries: ["v", "ve", "df", "gf", "n!"],
      },
      {
        id: 1002,
        name: "Hake & Smoky Chickpeas, Brown Rice & Quinoa, Roasted Roots",
        dietaries: ["gf", "df", "rsf"],
      },
    ];

    //item to be removed
    const itemId = 1001;

    const output = [
      {
        id: 1002,
        name: "Hake & Smoky Chickpeas, Brown Rice & Quinoa, Roasted Roots",
        dietaries: ["gf", "df", "rsf"],
      },
    ];

    expect(helpers.onRemoveItem(previewItems, itemId)).toEqual(output);
  });

  it("should return empty list", () => {
    const previewItems = [];

    //item to be removed
    const itemId = 1001;

    expect(helpers.onRemoveItem(previewItems, itemId)).toEqual(previewItems);
  });
});

describe("Sum Items", () => {
  it("should add sum dietary of the items", () => {
    const previewItems = [
      {
        id: 1001,
        name: "Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens",
        dietaries: ["v", "ve", "df", "gf", "n!"],
      },
      {
        id: 1002,
        name: "Hake & Smoky Chickpeas, Brown Rice & Quinoa, Roasted Roots",
        dietaries: ["gf", "df", "rsf"],
      },
      {
        id: 10010,
        name: "Pasta Salad Box",
        dietaries: ["ve", "v", "gf", "df"],
      },
    ];
    const output = {
      v: 2,
      ve: 2,
      df: 3,
      gf: 3,
      "n!": 1,
      rsf: 1,
    };

    expect(helpers.getTotalDietaries(previewItems)).toEqual(output);
  });
});
