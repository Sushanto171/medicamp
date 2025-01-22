import { default as successImage3 } from "../../assets/brighter.png";
import { default as successImage1 } from "../../assets/empower.png";
import { default as successImage2 } from "../../assets/success1.jpg";

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      image: successImage1,
      title: "Overcoming Health Challenges",
      description:
        "MediCamp provided critical care to John, a father of two, who recovered from a life-threatening illness.",
      quote: "MediCamp saved my life and brought hope back to my family.",
      person: "John Doe",
    },
    {
      id: 2,
      image: successImage2,
      title: "Empowering Communities",
      description:
        "Through MediCamp's vaccination drive, over 500 children were immunized, ensuring a healthier future.",
      quote: "MediCamp gave our children a chance to thrive.",
      person: "Jane Smith",
    },
    {
      id: 3,
      image: successImage3,
      title: "A Brighter Tomorrow",
      description:
        "Sarah's village now has regular health checkups, thanks to MediCamp's outreach program.",
      quote: "MediCamp made healthcare accessible for us.",
      person: "Sarah Khan",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
          Success Stories
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          Discover how MediCamp has made a meaningful impact in people&lsquo;s
          lives through care and compassion.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden story-card"
            >
              <img
                src={story.image}
                alt={`Illustration of ${story.title}`}
                className="w-full h-48 object-contain"
                onError={(e) => (e.target.src = "/fallback-image.jpg")}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {story.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {story.description}
                </p>
                <blockquote className="italic text-secondary">
                  &ldquo;{story.quote}&ldquo;
                </blockquote>
                <p className="text-sm font-medium mt-2 text-right">
                  - {story.person}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
