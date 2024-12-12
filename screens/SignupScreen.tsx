import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
  Platform,
} from "react-native";
import { AuthContext } from "../store/AuthContext";
import { SignupUserDto } from "../entities/SignupUserDto";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { signup } from "../store/userSlice";
// import {
//   FormControl,
//   Icon,
//   Input,
//   WarningOutlineIcon,
// } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "@rneui/themed";
const logo = require("../assets/logo.png");

const SignupScreen: React.FC = () => {
  const { setIsLogged, setIsAdmin } = React.useContext(AuthContext);
  const [newUser, setNewUser] = React.useState<SignupUserDto>({
    firstname: "",
    email: "",
    lastname: "",
    password: "",
    phone_nr: "",
    notification_token: "",
  });
  const [confirmPass, setConfirmPass] = React.useState("");
  const [isFormValid, setIsFormValid] = React.useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState(false);

  const dispatch = useDispatch<AppDispatch>();
  // const error = useSelector((state: userState) => state.client?.error);
  const error = useSelector((state: any) => state.user?.error);
  const user = useSelector((state: any) => state?.user);

  React.useEffect(() => {
    if (
      error &&
      newUser.email !== "" &&
      newUser.password !== "" &&
      newUser.firstname !== "" &&
      newUser.lastname !== "" &&
      newUser.phone_nr !== "" &&
      newUser.notification_token !== ""
    ) {
      setNewUser({
        firstname: "",
        email: "",
        lastname: "",
        password: "",
        phone_nr: "",
        notification_token: "",
      });
      setConfirmPass("");
      Alert.alert("Error", "Invalid credentials, try again.");
    }
  }, [error]);

  React.useEffect(() => {
    if (
      newUser.email.includes("@") &&
      newUser.password !== "" &&
      newUser.password === confirmPass &&
      newUser.firstname !== "" &&
      newUser.lastname !== "" &&
      newUser.phone_nr !== ""
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [
    newUser.email,
    newUser.password,
    newUser.firstname,
    newUser.lastname,
    newUser.phone_nr,
    confirmPass
  ]);

  async function handleSignup() {
    await dispatch(signup(newUser));
    if (!error) {
      setIsLogged(true);
      if (user.role === "admin") {
        setIsAdmin(true);
      }
    } else {
      Alert.alert("Something went wrong", "Try another email.");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={logo}
          style={{
            width: "30%",
            height: "30%",
            aspectRatio: 1,
            alignSelf: "center",
          }}
          resizeMode="contain"
        />
        {/* <FormControl
          isInvalid={
            newUser.firstname.length > 0 && newUser.firstname.length < 3
          }
        >
          <FormControl.Label>Name</FormControl.Label>
          <Input
            variant="underlined"
            size="xl"
            placeholder="First Name"
            value={newUser.firstname}
            onChangeText={(value) =>
              setNewUser((prevState) => ({ ...prevState, firstname: value }))
            }
          />
          <View style={{ height: 20 }}>
            {newUser.firstname.length > 0 && newUser.firstname.length < 3 && (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Please add a valid name
              </FormControl.ErrorMessage>
            )}
          </View>
        </FormControl>
        <FormControl
          isInvalid={newUser.lastname.length > 0 && newUser.lastname.length < 3}
        >
          <FormControl.Label>Last Name</FormControl.Label>
          <Input
            variant="underlined"
            size="xl"
            placeholder="Last Name"
            value={newUser.lastname}
            onChangeText={(value) =>
              setNewUser((prevState) => ({ ...prevState, lastname: value }))
            }
          />
          <View style={{ height: 20 }}>
            {newUser.lastname.length > 0 && newUser.lastname.length < 3 && (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Please add a valid last name
              </FormControl.ErrorMessage>
            )}
          </View>
        </FormControl>
        <FormControl
          isInvalid={!!newUser.email && !newUser.email.includes("@")}
        >
          <FormControl.Label>Email</FormControl.Label>
          <Input
            variant="underlined"
            size="xl"
            placeholder="Email"
            value={newUser.email}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(value) =>
              setNewUser((prevState) => ({ ...prevState, email: value }))
            }
          />
          <View style={{ height: 20 }}>
            {newUser.email && !newUser.email.includes("@") && (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Please add a valid email
              </FormControl.ErrorMessage>
            )}
          </View>
        </FormControl>
        <FormControl
          isInvalid={newUser.password.length > 0 && newUser.password.length < 3}
        >
          <FormControl.Label>Password</FormControl.Label>
          <Input
            variant="underlined"
            size="xl"
            placeholder="Password"
            value={newUser.password}
            secureTextEntry={!showPassword}
            onChangeText={(value) =>
              setNewUser((prevState) => ({ ...prevState, password: value }))
            }
            InputRightElement={
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  as={
                    <MaterialIcons
                      name={showPassword ? "visibility" : "visibility-off"}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
          />
          <View style={{ height: 20 }}>
            {newUser.password.length > 0 && newUser.password.length < 3 && (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Please add a valid password
              </FormControl.ErrorMessage>
            )}
          </View>
        </FormControl>
        <FormControl
          isInvalid={!!confirmPass && confirmPass !== newUser.password}
        >
          <FormControl.Label>Repeat Password</FormControl.Label>
          <Input
            variant="underlined"
            size="xl"
            placeholder="Repeat Password"
            value={confirmPass}
            secureTextEntry={!showConfirmPass}
            onChangeText={(value) => setConfirmPass(value)}
            InputRightElement={
              <Pressable onPress={() => setShowConfirmPass(!showConfirmPass)}>
                <Icon
                  as={
                    <MaterialIcons
                      name={showConfirmPass ? "visibility" : "visibility-off"}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
          />
          <View style={{ height: 20 }}>
            {!!confirmPass && newUser.password !== confirmPass && (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Passwords do not match
              </FormControl.ErrorMessage>
            )}
          </View>
        </FormControl>
        <FormControl
          isInvalid={
            newUser.phone_nr.length > 0 && !/^\d+$/.test(newUser.phone_nr)
          }
        >
          <FormControl.Label>Phone Nr.</FormControl.Label>
          <Input
            variant="underlined"
            size="xl"
            placeholder="Phone Number"
            value={newUser.phone_nr}
            keyboardType="phone-pad"
            onChangeText={(value) =>
              setNewUser((prevState) => ({ ...prevState, phone_nr: value }))
            }
          />
          <View style={{ height: 20 }}>
            {newUser.phone_nr.length > 0 && newUser.phone_nr.length < 3 && (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Please add a valid phone number
              </FormControl.ErrorMessage>
            )}
          </View>
        </FormControl> */}
      </ScrollView>
      <View style={styles.footer}>
      <Button
          title="Signup"
          size="lg"
          onPress={handleSignup}
          disabled={!isFormValid}
          disabledStyle={{ backgroundColor: "lightgrey" }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 30,
  },
  inputContainer: {
    marginBottom: 10,
  },
  labelStyle: {
    fontWeight: "bold",
  },
  iconContainer: {
    marginRight: 10,
  },
  datePickerContainer: {
    width: "100%",
  },
  footer: { justifyContent: "flex-end", padding: 4 },
});
export default SignupScreen;
