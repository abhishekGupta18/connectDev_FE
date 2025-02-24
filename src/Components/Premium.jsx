import axios from "axios"
import { baseURL } from "../utils/constant"

export const Premium = () => {

    const handlePayment = async (type) => {

        try {

            const order = await axios.post(baseURL + "/payment/create", {
                membershipType: type
            }, {
                withCredentials: true
            })

            console.log(order)
            const { keyId, amount, currency, orderId, notes } = order.data

            const options = {
                key: keyId, // Replace with your Razorpay key_id
                amount,
                currency,
                name: "connectDev",
                description: 'membership transaction',
                order_id: orderId,
                prefill: {
                    name: notes.firstName + " " + notes.lastName,
                    email: notes.email,
                },
                theme: {
                    color: '#F37254'
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (e) {
            console.log(e)
        }

    }
    return <div>
        <div className="flex w-full flex-col lg:flex-row">
            <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
                <h1 className="text-2xl">Silver Plan</h1>
                <ul>
                    <li>
                        chat with connections
                    </li>
                    <li>for 3 months</li>

                </ul>
                <button className="btn btn-secondary" onClick={() => handlePayment("silver")}>Buy Silver</button>
            </div>
            <div className="divider lg:divider-horizontal">OR</div>
            <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
                <h1 className="text-2xl">Gold Plan</h1>
                <ul>
                    <li>
                        chat with connections
                    </li>
                    <li>for 6 months</li>
                    <li>
                        Blue tick
                    </li>
                </ul>
                <button className="btn btn-primary" onClick={() => handlePayment("gold")}>Buy Gold</button>
            </div>
        </div>
    </div>
}