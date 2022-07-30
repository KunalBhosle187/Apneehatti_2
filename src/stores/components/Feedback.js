import { Button } from "@material-ui/core";
import React from "react";
import { feedbackFromUser } from "../actions/feedbackAction";
import { useDispatch, useSelector } from "react-redux";

const Feedback = () => {
  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/";
  const dispatch = useDispatch();
  const userFeedback = useSelector((state) => state.userFeedback);
  const { loading, error } = userFeedback;
  const feedback = {};

  const getfeedback = (e) => {
    feedback[e.target.name] = e.target.value;
  };
  const submitFeedback = (e) => {
    e.preventDefault();
    console.log(feedback);
    dispatch(feedbackFromUser(feedback));
    alert("Thank you for your help , Comeback again");
  };
  return (
    <div className="feedback ">
      <form onSubmit={getfeedback} className="m-3 feedback_form_container">
        <h5>Apneehatti: Purchase Satisfaction</h5>
        <h6>
          Thank you for your purchase. Please help us improve by taking this
          brief survey that asks you to share how you experienced our website.
        </h6>
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col"></th>
              <th for="dissatisfied" scope="col">
                Dissatisfied
              </th>
              <th for="neutral" scope="col">
                Neutral
              </th>
              <th for="satisfied" scope="col">
                Satisfied
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                Overall, how satisfied were you with your purchase experience
                today?
              </th>
              <td>
                <input
                  type="radio"
                  name="user_satisfaction"
                  id="dissatisfied"
                  onChange={getfeedback}
                  value="dissatisfied"
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="user_satisfaction"
                  value="neutral"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="user_satisfaction"
                  value="satisfied"
                  onChange={getfeedback}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="feedback_textarea">
          <h6>Please tell us why you feel that way:</h6>
          <textarea
            className="form-control"
            id="why_you_feel_that_way"
            name="why_you_feel_that_way"
            onChange={getfeedback}
          />
        </div>

        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col"></th>
              <th for="not_likely" scope="col">
                Not Likely
              </th>
              <th for="neutral" scope="col">
                Neutral
              </th>
              <th for="very_likely" scope="col">
                Very Likely
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                How likely are you to recommend our site to a friend, family
                member, or colleague?
              </th>
              <td>
                <input
                  type="radio"
                  name="user_recommendation"
                  value="not_likely"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="user_recommendation"
                  value="neutral"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="user_recommendation"
                  value="very_likely"
                  onChange={getfeedback}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="feedback_textarea">
          <h6>
            {" "}
            Please tell us how our site compares to other sites that sell
            similar products for each of the items below. If you dvalue not
            experience that part of our site, please select "N/A."
          </h6>
          <textarea
            className="form-control"
            id="site_compare_to_other_sites"
            name="site_compare_to_other_sites"
            onChange={getfeedback}
          />
        </div>

        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col"></th>
              <th for="wrose" scope="col">
                wrose
              </th>
              <th for="same" scope="col">
                about the same
              </th>
              <th for="better" scope="col">
                better
              </th>
              <th for="n/a" scope="col">
                N/A
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Overall organization/navigation</th>
              <td>
                <input
                  type="radio"
                  name="overall_organization/navigation"
                  value="wrose"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="overall_organization/navigation"
                  value="same"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="overall_organization/navigation"
                  value="better"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="overall_organization/navigation"
                  value="n/a"
                  onChange={getfeedback}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Clarity of product information</th>
              <td>
                <input
                  type="radio"
                  name="clarity_of_product_information"
                  value="wrose"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="clarity_of_product_information"
                  value="same"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="clarity_of_product_information"
                  value="better"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="clarity_of_product_information"
                  value="n/a"
                  onChange={getfeedback}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Ease of ordering process</th>
              <td>
                <input
                  type="radio"
                  name="ease_of_ordering_process"
                  value="wrose"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="ease_of_ordering_process"
                  value="same"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="ease_of_ordering_process"
                  value="better"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="user_othersite_comparison"
                  value="n/a"
                  onChange={getfeedback}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Product selection </th>
              <td>
                <input
                  type="radio"
                  name="product_selection "
                  value="wrose"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="product_selection"
                  value="same"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="product_selection"
                  value="better"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="product_selection"
                  value="n/a"
                  onChange={getfeedback}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Pricing</th>
              <td>
                <input
                  type="radio"
                  name="pricing"
                  value="wrose"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="pricing"
                  value="same"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="pricing"
                  value="better"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="pricing"
                  value="n/a"
                  onChange={getfeedback}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Shipping options</th>
              <td>
                <input
                  type="radio"
                  name="shipping_option"
                  value="wrose"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="shipping_option"
                  value="same"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="shipping_option"
                  value="better"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="shipping_option"
                  value="n/a"
                  onChange={getfeedback}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Ease of finding how to contact us</th>
              <td>
                <input
                  type="radio"
                  name="ease_of_finding_how_to_contact_us"
                  value="wrose"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="ease_of_finding_how_to_contact_us"
                  value="same"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="ease_of_finding_how_to_contact_us"
                  value="better"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="ease_of_finding_how_to_contact_us"
                  value="n/a"
                  onChange={getfeedback}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Customer service</th>
              <td>
                <input
                  type="radio"
                  name="customer_service"
                  value="wrose"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="customer_service"
                  value="same"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="customer_service"
                  value="better"
                  onChange={getfeedback}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name="customer_service"
                  value="n/a"
                  onChange={getfeedback}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="feedback_textarea">
          <h6>
            Do you have any suggestions on how we might improve our site and the
            purchase experience?
          </h6>
          <textarea
            className="form-control"
            id="site_review"
            onChange={getfeedback}
            name="site_review"
          />
        </div>

        <h6>How did you learn about our site? Please select all that apply.</h6>
        <div className="feedback_checkbox">
          <input
            type="checkbox"
            value="recommendated_from_another_person"
            name="recommendated_from_another_person"
            onChange={getfeedback}
            className="mx-2"
          />
          <label for="recommendated_from_another_person">
            Recommendation from another person
          </label>
        </div>

        <div className="feedback_checkbox">
          <input
            type="checkbox"
            value="social_media"
            name="social_media"
            onChange={getfeedback}
            className="mx-2"
          />
          <label>Social Media</label>
        </div>

        <div className="feedback_checkbox">
          <input
            type="checkbox"
            value="google"
            name="google"
            onChange={getfeedback}
            className="mx-2"
          />
          <label>Google</label>
        </div>
        <Button
          className="mt-2"
          color="primary"
          variant="contained"
          onClick={submitFeedback}
        >
          Submit Feedback
        </Button>
      </form>
    </div>
  );
};

export default Feedback;
