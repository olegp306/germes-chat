class AvatarHelper{
  hashCode (str) { // java String#hashCode
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
         hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return hash;
  }

  intToRGB (i){
      var c = (i & 0x00FFFFFF)
          .toString(16)
          .toUpperCase();

      return "00000".substring(0, 6 - c.length) + c;
  }

    getUserPhoto(username,size=50){
    size=size || 50;
    let nameArr=username.split(' ');
    let result='';
    for(let i=0;i<nameArr.length;i++)
    {
      result=result +' ' + nameArr[i].substring(0,1);
    }
    return 'http://placehold.it/'+size+'/'+this.intToRGB(this.hashCode(result))+'/fff&text='+result;
  }

}
export default AvatarHelper
