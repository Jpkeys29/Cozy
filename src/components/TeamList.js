import Title from "./Title"
// import TeamItem from "./TeamItem"
import Banner from "./Banner"

const TeamList = ({ addressData }) => {
    const title = {
        text: "TeamList",
        description: "Lorem ipsum dolor sit ame"
    }
    return (
        <section className="section-teams">
            <div className="container">
                <Title title={title.text} description={title.description} />
                <div>
                    <p>
                        {addressData?.area}
                        <br />
                        {addressData?.neighborhood}
                    </p>
                </div>

                {/* <div className="row">
                    <TeamItem/>
                    <TeamItem/>
                    <TeamItem/>
                </div> */}
            </div>
        </section>
    )
}

export default TeamList;