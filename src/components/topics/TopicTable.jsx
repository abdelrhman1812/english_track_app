import React from "react";
import IsLoading from "../common/IsLoading";
import TopicsAction from "./TopicsActions";

const TopicTable = ({
  loading,
  isDeleted,
  topics,
  handleDeleteTopic,
  handleUpdateTopic,
}) => {
  return (
    <>
      <div className="table-container">
        <div className="table-body border-0">
          {loading ? (
            <IsLoading />
          ) : (
            <>
              {topics.map((topic, index) => (
                <div
                  className="table-row d-flex flex-column shadow border-0 my-3 "
                  key={index}
                >
                  <div className="table-cell p-0 border-0 ">
                    <div className="table-cell-head title-topic position-relative">
                      <h6>{topic.title}</h6>
                      <TopicsAction
                        isDeleted={isDeleted}
                        handleUpdateTopic={handleUpdateTopic}
                        handleDeleteTopic={handleDeleteTopic}
                        topic={topic}
                      />
                    </div>
                  </div>
                  <div className="table-cell border-0   p-2 position-relative ">
                    <div className="table-cell-head bg-transparent opacity-75">
                      {/* <h6 className="text-dark">Topic</h6> */}
                    </div>
                    <h6>Topic :</h6>
                    <pre className="p-2">{topic.topic}</pre>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TopicTable;
