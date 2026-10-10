import { Link } from 'react-router-dom';
import { PageHero } from '../components/Sections.jsx';
import { Phone, Mail } from '../components/Icons.jsx';
import { PHONE, PHONE_HREF, EMAIL } from '../components/Footer.jsx';
import usePageTitle from '../lib/usePageTitle.js';

const FAQS = [
  { q: 'Where is my order?', a: <>You can follow your order live in the BiteVo app. If it's taking longer than expected, call us on <a href={PHONE_HREF}>{PHONE}</a> with your order ID and we'll check right away.</> },
  { q: 'Something is wrong or missing in my order', a: "We're sorry about that! Please contact us as soon as possible with your order ID and, if you can, a photo of the issue. We'll make it right." },
  { q: 'Can I cancel my order?', a: 'Call us as soon as you can. Since we start cooking quickly after an order is placed, the sooner you reach us, the easier it is for us to help.' },
  { q: 'When will I get my refund?', a: 'Approved refunds go back to your original payment method. The time it takes to reflect depends on your bank or payment provider.' },
  { q: 'Which payment methods do you accept?', a: 'All the payment options available to you are shown at checkout in the BiteVo app.' },
  { q: 'Do you deliver to my area?', a: 'Enter your delivery address in the BiteVo app to see whether we currently deliver to you.' },
  { q: 'How do I delete my account or my data?', a: <>Email us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a> from your registered email, or call us, and we'll take care of it. See our <Link to="/privacy">Privacy Policy</Link> for more.</> },
];

const TOPICS = ['Order issue', 'Payment or refund', 'Delivery', 'Account', 'Feedback', 'Other'];

// Opens the visitor's email app with the message filled in (the site has no server).
function sendMessage(e) {
  e.preventDefault();
  const d = new FormData(e.currentTarget);
  const order = d.get('order');
  const subject = `${d.get('topic')}${order ? ` — Order ${order}` : ''}`;
  const body = [
    `Name: ${d.get('name')}`,
    `Phone: ${d.get('phone')}`,
    ...(order ? [`Order ID: ${order}`] : []),
    '',
    d.get('message'),
  ].join('\n');
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function Support() {
  usePageTitle('Help & Support');

  return (
    <>
      <PageHero pill="Help & Support" title={<>How can we <em>help you?</em></>}>
        Questions about an order, a payment or your account? Our support team is just a call or an email away.
      </PageHero>

      <section className="container">
        <div className="contact-cards">
          <div className="contact-card">
            <div className="contact-card__icon"><Phone /></div>
            <h3>Call us</h3>
            <a className="contact-card__value" href={PHONE_HREF}>{PHONE}</a>
            <p>Speak to our support team directly.</p>
            <a href={PHONE_HREF} className="btn btn--red">Call Now</a>
          </div>
          <div className="contact-card">
            <div className="contact-card__icon"><Mail /></div>
            <h3>Email us</h3>
            <a className="contact-card__value" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <p>Write to us and we'll get back to you.</p>
            <a href={`mailto:${EMAIL}`} className="btn btn--outline">Send Email</a>
          </div>
        </div>
      </section>

      <section className="container support">
        <div className="faq">
          <span className="eyebrow">FAQs</span>
          <h2>Common questions</h2>
          {FAQS.map(f => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>

        <div>
          <span className="eyebrow">Write to us</span>
          <h2>Send a message</h2>
          <form className="form" onSubmit={sendMessage}>
            <div className="form__row">
              <label>Your name
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label>Phone number
                <input type="tel" name="phone" autoComplete="tel" required />
              </label>
            </div>
            <div className="form__row">
              <label>Topic
                <select name="topic" required>
                  {TOPICS.map(t => <option key={t}>{t}</option>)}
                </select>
              </label>
              <label>Order ID (optional)
                <input type="text" name="order" />
              </label>
            </div>
            <label>Message
              <textarea name="message" required></textarea>
            </label>
            <button type="submit" className="btn btn--red btn--lg">Send Message</button>
            <p className="form__note">This opens your email app with your message addressed to {EMAIL}.</p>
          </form>
        </div>
      </section>
    </>
  );
}
