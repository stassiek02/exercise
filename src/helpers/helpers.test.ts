import {combineFilters, removeExtremeValues} from "./helpers";

it('check if combineFilters works correctly',()=>{
    const filter1 = (item:any)=>item.height > 100;
    const filter2 = (item:any)=>item.name.toLowerCase().includes('l');

    const mockData = [{height:102,name:'luke'},{height: 123,name:'CP-99'},{height: 170,name:'leia'}];

    const result = mockData.filter(combineFilters(filter1,filter2));

    expect(result).toEqual([{height:102,name:'luke'},{height: 170,name:'leia'}]);
})


it('check if removeExtremeValues work correctly',()=>{
    const mockData = [123,11,98,100,67,999];
    const copyOfMockData = [...mockData];
    const result = removeExtremeValues(mockData);


    //check if removeExtremeValues is pure
    expect(mockData).toEqual(copyOfMockData);

    expect(result).not.toContain(11);
    expect(result).not.toContain(99);
    expect(result).toHaveLength(4);
})