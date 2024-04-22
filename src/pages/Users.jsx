import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

function NewUsers() {
    return (
        <Heading as="h1">
            <h3>Create a new user</h3>
            <SignupForm />
        </Heading>
    );
}

export default NewUsers;
