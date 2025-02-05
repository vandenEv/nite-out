/* General registration screen
    see figma for reference
*/

import React from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    SafeAreaView
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const { width, height } = Dimensions.get("window");

const GeneralRegistrationScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={[styles.section, styles.backgroundBlue]} />
                <View style={[styles.section, styles.backgroundLightBlue]} />
                <View style={[styles.section, styles.backgroundWhite]} />

                {/* Form Container */}
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Create account</Text>
                    <Text style={styles.subtitle}>Sign up and start playing</Text>

                    {/* Full Name Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        placeholderTextColor="#999"
                    />

                    {/* Email Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                    />

                    {/* Password Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#999"
                        secureTextEntry
                    />

                    {/* Sign Up Button */}
                    <TouchableOpacity style={styles.signUpButton}>
                        <Text style={styles.signUpText}>Sign up</Text>
                    </TouchableOpacity>

                    {/* Sign Up as Publican Button */}
                    <TouchableOpacity style={styles.publicanButton}>
                        <Text style={styles.publicanText}>Sign up as Publican</Text>
                    </TouchableOpacity>

                    {/* Sign In Link */}
                    <Text style={styles.footerText}>
                        Already have an account?{" "}
                        <Text style={styles.signInLink}>Sign in</Text>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#00B4D8",
    },
    container: {
        flex: 1,
        backgroundColor: "#00B4D8",
    },
    section: {
        position: "absolute",
        left: 0,
        right: 0,
    },
    backgroundBlue: {
        height: "100%",
        top: 0,
        backgroundColor: "#00B4D8",
    },
    backgroundLightBlue: {
        height: "100%",
        top: "3%",
        borderTopLeftRadius: 42,
        borderTopRightRadius: 42,
        backgroundColor: "#90E0EF",
    },
    backgroundWhite: {
        height: "100%",
        top: "20%",
        borderTopLeftRadius: 42,
        borderTopRightRadius: 42,
        backgroundColor: "#f8f9fa",
    },
    formContainer: {
        margin: 20,
        padding: 20,
        borderRadius: 20,
        elevation: 3,
        top: "5%",
    },
    title: {
        fontSize: 28,
        color: "#212529",
        fontWeight: "bold",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 14,
        color: "#212529",
        fontWeight: "light",
        textAlign: "center",
        marginBottom: 70,
    },
    input: {
        height: 50,
        backgroundColor: "#eef0f2",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 30,
    },
    signUpButton: {
        backgroundColor: "#FF007A",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 100, // Fixed non-standard marginTop
    },
    signUpText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    publicanButton: {
        backgroundColor: "#F8B8C7",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    publicanText: {
        color: "black",
        fontWeight: "bold",
        fontSize: 16,
    },
    footerText: {
        textAlign: "center",
        marginTop: 15,
        color: "#666",
    },
    signInLink: {
        color: "#FF007A",
        fontWeight: "bold",
    },
});

export default GeneralRegistrationScreen;