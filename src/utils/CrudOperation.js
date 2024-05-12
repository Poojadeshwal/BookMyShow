let CrudOperation={
    get: function(list){
        //  console.log("crud", list);
        return list
    },
    add:function(list,newObj){
        list.push(newObj);
        return list;
    },
    delete: function(list,id,pk){
        return list.filter((item)=>{
            return item[pk]!==id;
        })

    },
    update:function (list,obj,pk){
        return list.map((item)=>{
            if(item[pk]==obj[pk]){
            return obj[pk]
            }
            else{
            return item
            }
        })

    },
      getDetail: function(list, id, pk) {
        console.log(id);
            console.log(pk)
        return list.filter((item) => {
            
            return item[pk] === id
            
        })
    }
}
export default CrudOperation;