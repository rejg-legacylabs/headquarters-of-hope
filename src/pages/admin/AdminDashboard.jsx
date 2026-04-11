import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Heart, ClipboardList, Users, Briefcase, Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const statusColors = {
  pending_review: "bg-yellow-100 text-yellow-800",
  in_review: "bg-blue-100 text-blue-800",
  accepted: "bg-green-100 text-green-800",
  referred: "bg-purple-100 text-purple-800",
  scheduled: "bg-indigo-100 text-indigo-800",
  active_partner: "bg-green-100 text-green-800",
  declined: "bg-red-100 text-red-800",
  closed: "bg-gray-100 text-gray-800",
  new: "bg-yellow-100 text-yellow-800",
  in_progress: "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
};

function SubmissionCard({ item, type, onSelect }) {
  const getName = () => {
    if (type === "intakes") return `${item.first_name} ${item.last_name}`;
    if (type === "referrals") return `${item.participant_first_name} ${item.participant_last_name}`;
    if (type === "employers") return item.company_name;
    return item.name;
  };

  return (
    <div
      onClick={() => onSelect(item)}
      className="bg-white border border-border rounded-lg p-4 hover:border-secondary/50 hover:shadow-sm transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="font-medium text-sm text-foreground">{getName()}</h4>
        <Badge className={`text-[10px] ${statusColors[item.status] || "bg-gray-100 text-gray-800"}`}>
          {(item.status || "").replace(/_/g, " ")}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground mb-1">{item.reference_id}</p>
      <p className="text-xs text-muted-foreground">{new Date(item.created_date).toLocaleDateString()}</p>
    </div>
  );
}

function DetailPanel({ item, type, onClose, onUpdate }) {
  const [status, setStatus] = useState(item?.status || "");
  const [notes, setNotes] = useState(item?.admin_notes || "");
  const [assignedTo, setAssignedTo] = useState(item?.assigned_to || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setStatus(item?.status || "");
    setNotes(item?.admin_notes || "");
    setAssignedTo(item?.assigned_to || "");
  }, [item]);

  const entityMap = { intakes: "WebsiteIntake", referrals: "PartnerReferral", employers: "EmployerInquiry", contacts: "ContactSubmission" };
  const statusOptions = {
    intakes: ["pending_review", "in_review", "accepted", "referred", "closed"],
    referrals: ["pending_review", "in_review", "accepted", "scheduled", "closed"],
    employers: ["pending_review", "in_review", "active_partner", "declined", "closed"],
    contacts: ["new", "in_progress", "resolved", "closed"],
  };

  const handleSave = async () => {
    setSaving(true);
    const entity = entityMap[type];
    await base44.entities[entity].update(item.id, { status, admin_notes: notes, assigned_to: assignedTo });
    setSaving(false);
    onUpdate();
  };

  if (!item) return null;

  return (
    <Sheet open={!!item} onOpenChange={() => onClose()}>
      <SheetContent className="sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-heading">{item.reference_id}</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 mt-6">
          <div className="space-y-3">
            {Object.entries(item).filter(([k]) => !["id", "created_date", "updated_date", "created_by", "admin_notes", "assigned_to", "status", "source", "reference_id"].includes(k)).map(([key, value]) => (
              <div key={key}>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{key.replace(/_/g, " ")}</p>
                <p className="text-sm">{Array.isArray(value) ? value.join(", ") : typeof value === "boolean" ? (value ? "Yes" : "No") : (value || "—")}</p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Status</p>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(statusOptions[type] || []).map((s) => (
                    <SelectItem key={s} value={s}>{s.replace(/_/g, " ")}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Assigned To</p>
              <Input value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} placeholder="Name or email" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Admin Notes</p>
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
            </div>
            <Button onClick={handleSave} disabled={saving} className="w-full bg-secondary hover:bg-secondary/90 text-primary">
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function AdminDashboard() {
  const { user, isLoadingAuth } = useAuth();
  const [intakes, setIntakes] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const [i, r, e, c] = await Promise.all([
      base44.entities.WebsiteIntake.list("-created_date", 100),
      base44.entities.PartnerReferral.list("-created_date", 100),
      base44.entities.EmployerInquiry.list("-created_date", 100),
      base44.entities.ContactSubmission.list("-created_date", 100),
    ]);
    setIntakes(i);
    setReferrals(r);
    setEmployers(e);
    setContacts(c);
    setLoading(false);
  };

  useEffect(() => {
    if (user?.role === 'admin') loadData();
  }, [user]);

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-7 h-7 text-secondary" fill="currentColor" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-white mb-2">Access Restricted</h1>
          <p className="text-white/70 text-sm mb-6">This area is for authorized staff only.</p>
          <Link to="/"><Button size="sm" className="bg-secondary text-primary">Return to Website</Button></Link>
        </div>
      </div>
    );
  }

  const countPending = (arr, field = "pending_review") => arr.filter((a) => a.status === field).length;

  const tabs = [
    { id: "intakes", label: "Intakes", icon: ClipboardList, data: intakes, pending: countPending(intakes) },
    { id: "referrals", label: "Referrals", icon: Users, data: referrals, pending: countPending(referrals) },
    { id: "employers", label: "Employers", icon: Briefcase, data: employers, pending: countPending(employers) },
    { id: "contacts", label: "Contacts", icon: Mail, data: contacts, pending: countPending(contacts, "new") },
  ];

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-primary text-white px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary" fill="currentColor" />
            </div>
            <div>
              <h1 className="font-display text-sm font-bold tracking-wide uppercase">Pathways Admin</h1>
              <p className="text-[10px] text-white/60">Website Submissions Review</p>
            </div>
          </div>
          <Link to="/">
            <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-xs gap-1">
              <ArrowLeft className="w-3 h-3" /> Back to Site
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-border border-t-secondary rounded-full animate-spin" />
          </div>
        ) : (
          <Tabs defaultValue="intakes">
            <TabsList className="mb-6 bg-white border border-border">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="gap-2 text-xs">
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {tab.pending > 0 && (
                    <Badge className="bg-secondary text-primary text-[10px] h-5 min-w-5 flex items-center justify-center">
                      {tab.pending}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                {tab.data.length === 0 ? (
                  <div className="text-center py-16 text-muted-foreground">
                    <tab.icon className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No {tab.label.toLowerCase()} yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tab.data.map((item) => (
                      <SubmissionCard
                        key={item.id}
                        item={item}
                        type={tab.id}
                        onSelect={(it) => { setSelected(it); setSelectedType(tab.id); }}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>

      <DetailPanel
        item={selected}
        type={selectedType}
        onClose={() => setSelected(null)}
        onUpdate={() => { loadData(); setSelected(null); }}
      />
    </div>
  );
}