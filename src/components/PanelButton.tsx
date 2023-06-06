import "./panelbutton.scss";

export default (props: { active?: boolean; action: (e: MouseEvent) => void; icon: string }) => {
    return (
        <div classList={{ panelbutton: true, active: props.active }} onClick={props.action}>
            <div class="icon">{props.icon}</div>
        </div>
    );
};
