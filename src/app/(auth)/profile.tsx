import { Text, TouchableOpacity, View } from "react-native";
import { useAuthContext } from "../../modules/auth/context";

export default function Profile() {
    const {user, logout} = useAuthContext()

    return (
        <View style={{flex: 1}}>
            <Text style={{color: "white"}}>{user?.first_name}</Text>
            <Text style={{color: "white"}}>{user?.last_name}</Text>
            <Text style={{color: "white"}}>{user?.email}</Text>
            {/* <Text style={{color: "white"}}>{user?.phoneNumber}</Text> */}
            {/* <Text style={{color: "white"}}>{user?.birthDate}</Text> */}
            <Text style={{color: "white"}}>@{user?.username}</Text>
            
            <TouchableOpacity style={{backgroundColor: "white", width: "30%"}} onPress={() => {logout()}}>
                <Text style={{color: "black"}}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}