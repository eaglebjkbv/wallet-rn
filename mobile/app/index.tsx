
import { Link } from "expo-router";
import React from "react";
import { Text, View ,StyleSheet} from "react-native";

export default function Index() {
  return (
    <View
      style={style.container}
    >
      <Text>Merhaba Arkadaşlar...</Text>
      <Link href={"/about"}>Selamlar</Link>
      
    </View>
  );
}
const style=StyleSheet.create({
container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",        
}
        
      
})
