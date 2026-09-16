document.addEventListener(
    "DOMContentLoaded",
    async function () {

        const supabase =
            window.supabaseClient;

        const form =
            document.getElementById(
                "activationForm"
            );

        const passwordInput =
            document.getElementById(
                "password"
            );

        const confirmPasswordInput =
            document.getElementById(
                "confirmPassword"
            );

        const activateButton =
            document.getElementById(
                "activateBtn"
            );

        const message =
            document.getElementById(
                "activationMessage"
            );


        if (!supabase) {

            showMessage(
                "Supabase is not configured.",
                "danger"
            );

            return;
        }


        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const password =
                    passwordInput.value;

                const confirmPassword =
                    confirmPasswordInput.value;


                if (password.length < 8) {

                    showMessage(
                        "Password must contain at least 8 characters.",
                        "danger"
                    );

                    return;
                }


                if (password !== confirmPassword) {

                    showMessage(
                        "Passwords do not match.",
                        "danger"
                    );

                    return;
                }


                activateButton.disabled = true;

                activateButton.textContent =
                    "Activating...";


                try {

                    const {
                        error
                    } =
                        await supabase.auth.updateUser({
                            password
                        });


                    if (error) {
                        throw error;
                    }


                    showMessage(
                        "Your technician account has been activated successfully. You can now log in.",
                        "success"
                    );


                    form.reset();


                    setTimeout(
                        function () {

                            window.location.href =
                                "./auth.html";

                        },
                        2000
                    );


                } catch (error) {

                    console.error(
                        "Activation error:",
                        error
                    );


                    showMessage(
                        error.message ||
                        "Unable to activate your account.",
                        "danger"
                    );


                } finally {

                    activateButton.disabled = false;

                    activateButton.textContent =
                        "Activate Account";
                }

            }
        );


        function showMessage(
            text,
            type
        ) {

            message.className =
                `alert alert-${type}`;

            message.textContent =
                text;
        }

    }
);