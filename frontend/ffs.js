function makeTree(data) {
    const tree = [];
    const mappedData = {};
    
    data.forEach(item => {
      const id = item._id;
      mappedData[id] = { ...item, children: [] };
    });
    
    Object.keys(mappedData).forEach(id => {
      const item = mappedData[id];
      const parentId = item.parent?._ref;
  
      if (parentId) {
        mappedData[parentId].children.push(item);
        item.slug = mappedData[parentId].slug + item.slug;
      } else {
        tree.push(item);
      }
    });
    
    return tree;
  }
  
  const pages = [
    {
      _id: 'b8b281ab-14b3-4fff-b3d2-2abc7c5c5dcf',
      name: 'Start',
      slug: '/',
      children: []
    },
    {
      _id: '73bcabb1-c9ff-473f-943c-93a18b1f99ce',
      name: 'Om oss',
      slug: '/om-oss',
      children: []
    },
    {
      _id: 'e3118a78-b470-4f4a-ab89-af6a6b0577d7',
      name: 'Kontakt',
      parent: {
        _ref: '73bcabb1-c9ff-473f-943c-93a18b1f99ce'
      },
      slug: '/kontakt',
      children: []
    },
    {
      _id: 'e1f24688-d6d0-43a8-b103-cf520086d73d',
      name: 'Formulär',
      parent: {
        _ref: 'e3118a78-b470-4f4a-ab89-af6a6b0577d7'
      },
      slug: '/formular',
      children: []
    },
    {
      _id: 'eb301b7d-c6ba-4219-959b-627c3bf0214b',
      name: 'Linus egen sida',
      slug: '/linus-egen-sida',
      children: []
    }
  ];
  
  const result = makeTree(pages, null);
  console.log(JSON.stringify(result, null, 2));
  